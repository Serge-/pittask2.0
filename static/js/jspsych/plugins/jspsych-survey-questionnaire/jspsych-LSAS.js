jsPsych.plugins['LSAS'] = (function () {
    var plugin = {};
  
    plugin.info = {
      name: 'LSAS',
      stage_name: 'LSAS',
      description: '',
      parameters: {
        questions: {
          type: jsPsych.plugins.parameterType.COMPLEX,
          array: true,
          pretty_name: 'Questions',
          nested: {
            prompt: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: 'Prompt',
              default: undefined,
              description: 'The strings that will be associated with a group of options.'
            },
            options: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: 'Options',
              array: true,
              default: undefined,
              description: 'Displays options for an individual question.'
            },
            required: {
              type: jsPsych.plugins.parameterType.BOOL,
              pretty_name: 'Required',
              default: false,
              description: 'Subject will be required to pick an option for each question.'
            },
            horizontal: {
              type: jsPsych.plugins.parameterType.BOOL,
              pretty_name: 'Horizontal',
              default: false,
              description: 'If true, then questions are centered and options are displayed horizontally.'
            },
            name: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: 'Question Name',
              default: '',
              description: 'Controls the name of data values associated with this question'
            }
          }
        },
        randomize_question_order: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Randomize Question Order',
          default: false,
          description: 'If true, the order of the questions will be randomized'
        },
        preamble: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Preamble',
          default: null,
          description: 'HTML formatted string to display at the top of the page above all the questions.'
        },
        button_label: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Button label',
          default: 'Continue',
          description: 'Label of the button.'
        },
        event_type: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Event type',
          default: null,
          description: 'Event type'
        },
        event_raw_details: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Event raw details',
          default: null,
          description: 'Event raw details'
        },
        event_converted_details: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Event converted details',
          default: null,
          description: 'Event converted details'
        }
      }
    }
    plugin.trial = function (display_element, trial) {
      var plugin_id_name = "jspsych-survey-multi-choice";
  
      var html = "";
  
      // store response
      var response = {
        trial_events: []
      };
  
      response.trial_events.push({
        "event_type": trial.event_type,
        "event_raw_details": trial.event_raw_details,
        "event_converted_details": trial.event_converted_details,
        "timestamp": jsPsych.totalTime()
      });
  
      $('body').prepend(
        `<header>
          <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
              <div class="navbar-header">
              <p class="navbar-text">
                  <b>${plugin.info.name}</b>
              </p>
              </div>
            </div>
          </nav>
        </header>`);
  
      // inject CSS for trial
      html += '<style id="jspsych-survey-multi-choice-css">';
      html += ".jspsych-survey-multi-choice-question { display: flex; text-align: left; border-top: 1px solid }" +
        ".jspsych-survey-multi-choice-text span.required {color: darkred;}" +
        ".jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-text {  text-align: center;}" +
        ".jspsych-survey-multi-choice-option { display: flex; justify-content: center; align-items: center; line-height: 2; padding: 1rem 0; }" +
        ".jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-option {  width: 100%;}" +
        ".jspsych-survey-highlight { cursor: pointer; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }" +
        ".jspsych-survey-multi-choice-form { max-width: 1400px }" +
        ".jspsych-btn { margin: 100px 0; }" +
        ".jspsych-content { margin-top: 130px;}" +
        "ul {list-style: none}" +
        ".jspsych-survey-multi-choice { margin-top: 10rem; }" +
        ".jspsych-survey-multi-choice-number { display: flex; height: 100%; width: 30px; text-align: center; justify-content: center; }" +
        ".jspsych-survey-multi-choice-preamble { text-align: left; max-width: 1400px; padding-bottom: 1rem; }" +
        ".jspsych-survey-multi-choice-preamble ul {  list-style-type: disc; }" +
        ".jspsych-survey-multi-choice-instructions { display: flex; justify-content: space-between; border-bottom: 2px solid; }" +
        ".jspsych-survey-multi-choice-instructions .jspsych-survey-multi-choice-instructions-title { display: flex;  padding-inline-start: 0; margin-bottom: 0; width: 70%; }" +
        ".jspsych-survey-multi-choice-instructions .jspsych-survey-multi-choice-instructions-title div { width: 100%; }" +
        ".jspsych-survey-multi-choice-instructions ul { display: flex; width: 100%; height: 120px; padding-inline-start: 0; justify-content: space-around; }" +
        ".jspsych-survey-multi-choice-instructions li { display: flex; justify-content: center; width: 90px; align-items: center; }" +
        "label.jspsych-survey-multi-choice-text input[type='radio'] {margin-right: 1em;}" +
        ".jspsych-survey-highlight { width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }" +
        "p { margin: 0 0 0px; }"
      html += '</style>';
  
      // show preamble text
      if (trial.preamble !== null) {
        html += '<div id="jspsych-survey-multi-choice-preamble" class="jspsych-survey-multi-choice-preamble">' + trial.preamble + '</div>';
      }
  
      // form element
      html += '<div>';
      html += '<form id="jspsych-survey-multi-choice-form" class="jspsych-survey-multi-choice-form">';
      html +=
        `<div id="jspsych-survey-multi-choice-preamble" class="jspsych-survey-multi-choice-instructions">
            <div style="display: flex; align-items: center; border-right: 3px solid #fff; width: 30%">
                <p>Understanding the situations:</p>
            </div>
            <div class="jspsych-survey-multi-choice-instructions-title">
                <div style="border-right: 1px solid #fff;">
                    <h4>FEAR OR ANXIETY</h4>
                    <ul>
                        <li><div>None</div></li>
                        <li><div>Mild</div></li>
                        <li><div>Moderate</div></li>
                        <li><div>Severe</div></li>
                    </ul>
                </div>
                <div>
                    <h4>AVOIDANCE</h4>
                    <ul>
                        <li><div>Never (0%)</div></li>
                        <li><div>Occasionally (1%-33% of the time)</div></li>
                        <li><div>Often (33%-67% of the time)</div></li>
                        <li><div>Usually (67%-100% of the time)</div></li>
                    </ul>
                </div>
            </div>
        </div>`
  
      // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
      // so that the data are always associated with the same question regardless of order
      var question_order = [];
      for (var i = 0; i < trial.questions.length; i++) {
        question_order.push(i);
      }
      if (trial.randomize_question_order) {
        question_order = jsPsych.randomization.shuffle(question_order);
      }
  
      // add multiple-choice questions
      for (var i = 0; i < trial.questions.length; i++) {
  
        // get question based on question_order
        var question = trial.questions[question_order[i]];
        var question_id = question_order[i];
  
        // create question container
        var question_classes = ['jspsych-survey-multi-choice-question'];
        if (question.horizontal) {
          question_classes.push('jspsych-survey-multi-choice-horizontal');
        }
  
        html += '<div id="jspsych-survey-multi-choice-' + question_id + '" class="' + question_classes.join(' ') + '"  data-name="' + question.name + '">';
  
        // add question text
        html += '<div style="display: flex; width: 30%; border-right: 3px solid #fff;"><span class="jspsych-survey-multi-choice-number">' + (i + 1) + '.</span><p class="jspsych-survey-multi-choice-text survey-multi-choice jspsych-survey-multi-choice-question-text" style="text-align: left; padding: 0 10px; width: 100%;">' + question.prompt
        // question.required
        html += '</p></div>';
        html += '<div style="display: flex; width: 70%; justify-content: space-around;">';
  
        // create option radio buttons
        for (var j = 0; j < question.options.length; j++) {
            if(j === 0) {
                html += '<div class="f" style="display: flex; width: 70%; justify-content: space-around; border-right: 1px solid #fff; ">';
            } else {
                html += '<div class="a" style="display: flex; width: 70%; justify-content: space-around; ">';
            }
          // add label and question text
          for (var k = 0; k < question.options[j].length; k++) {
            var option_id_name = "jspsych-survey-multi-choice-option-" + question_id + "-" + j + '-' + k;
            var input_name = 'jspsych-survey-multi-choice-response-' + question_id + '-' + j;
            var input_id = 'jspsych-survey-multi-choice-response-' + question_id + '-' + j + '-' + k;
    
            var required_attr = question.required ? 'required' : '';
    
            // add radio button container
            html += '<div id="' + option_id_name + '" class="jspsych-survey-multi-choice-option">';
            html += '<label class="jspsych-survey-multi-choice-text jspsych-survey-highlight" for="' + input_id + '">' + question.options[j][k] + '</label>';
            html += '<input hidden type="radio" name="' + input_name + '" id="' + input_id + '" value="' + question.options[j][k] + '" ' + required_attr + '></input>';
            html += '</div>';
          }
          html += '</div>';
        }
        
        html += '</div></div>';
      }
  
      // add submit button
      html += '<input type="submit" id="' + plugin_id_name + '-next" class="' + plugin_id_name + ' jspsych-btn"' + (trial.button_label ? ' value="' + trial.button_label + '"' : '') + '></input>';
  
  
      html += '</form>';
      html += '</div>';
  
      html +=
        `<div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
              <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                  <header class="modal__header">
                    <h2 class="modal__title" id="modal-1-title">
                      Warning!
                    </h2>
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                  </header>
                  <main class="modal__content" id="modal-1-content">
                    <p>${survey.modal}</p>
                  </main>
                  <footer class="modal__footer">
                    <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                  </footer>
                </div>
              </div>
          </div>`;
  
      // render
      display_element.innerHTML = html;
  
      // function to handle key press responses
      var after_response = function (info) {
  
        if (info.key_release === undefined) {
          response.trial_events.push({
            "event_type": "key press",
            "event_raw_details": info.key,
            "event_converted_details": jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key) + ' key pressed',
            "timestamp": jsPsych.totalTime()
          });
        } else {
          response.trial_events.push({
            "event_type": "key release",
            "event_raw_details": info.key_release,
            "event_converted_details": jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key_release) + ' key released',
            "timestamp": jsPsych.totalTime()
          });
        }
      }
  
      $('.jspsych-survey-highlight').click(function () {
        $(this).next('input').prop("checked", true);
        $(this).parent().parent().find('.jspsych-survey-highlight').removeClass('bg-primary');
        $(this).addClass('bg-primary');
        $(this).closest('input').click();
      })
  
      document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        // measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;
        // create object to hold responses
        var question_data = {};
        for (var i = 0; i < trial.questions.length; i++) {
            var match = display_element.querySelector('#jspsych-survey-multi-choice-' + i);
            if (match.querySelector(".f input[type=radio]:checked") !== null && match.querySelector(".a input[type=radio]:checked")) {
                var val_f = match.querySelector(".f input[type=radio]:checked").value;
                var val_a = match.querySelector(".a input[type=radio]:checked").value;
                $(match).find('.jspsych-survey-multi-choice-question-text').removeClass('survey-error-after');
                $(match).find('.jspsych-survey-multi-choice-number').removeClass('survey-error-text');
            } else {
                $(match).find('.jspsych-survey-multi-choice-question-text').addClass('survey-error-after');
                $(match).find('.jspsych-survey-multi-choice-number').addClass('survey-error-text');
            }
            var obje_f = {};
            var obje_a = {};

            if (match.attributes['data-name'].value !== '') {
                name = match.attributes['data-name'].value;
            }
            obje_f["F" + (i + 1)] = val_f;
            obje_a["A" + (i + 1)] = val_a;
            Object.assign(question_data, obje_f, obje_a);
        }

  
        if ($(".survey-error-after").length < 1) {
          // kill keyboard listeners
          if (typeof keyboardListener !== 'undefined') {
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            jsPsych.pluginAPI.cancelClickResponse(clickListener);
          }
  
          // save data
          var trial_data = {
            "stage_name": JSON.stringify(plugin.info.stage_name),
            "responses": JSON.stringify(question_data),
            "question_order": JSON.stringify(question_order),
            "events": JSON.stringify(response.trial_events)
          };
  
          display_element.innerHTML = '';
          $('.navbar').remove();
  
          // next trial
          jsPsych.finishTrial(trial_data);
        } else {
          MicroModal.show('modal-1');
        }
  
      });
  
      var startTime = performance.now();
  
      // start the response listener
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: jsPsych.ALL_KEYS,
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });
      var clickListener = jsPsych.pluginAPI.getMouseResponse({
        callback_function: after_response,
        valid_responses: jsPsych.ALL_KEYS,
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });
    };
  
    return plugin;
  })();