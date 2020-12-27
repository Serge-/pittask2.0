jsPsych.plugins['YIAT'] = (function () {
    var plugin = {};
  
    plugin.info = {
      name: 'YIAT',
      stage_name: 'YIAT',
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
        time_stamp: {
          type: jsPsych.plugins.parameterType.OBJECT,
          pretty_name: 'Timestamp',
          default: {},
          description: 'Object for collecting timestamp'
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
      
      var plugin_id_name = "jspsych-survey-multi-choice-YIAT";
      var html = "";
  
      // store responses, events
      var response = {
        trial_events: []
      };
      var timestamp_onload = jsPsych.totalTime();
  
      response.trial_events.push({
        "event_type": trial.event_type,
        "event_raw_details": trial.event_raw_details,
        "event_converted_details": trial.event_converted_details,
        "timestamp": jsPsych.totalTime(),
        "time_elapsed": jsPsych.totalTime() - timestamp_onload
      });
  
      // inject CSS for trial
      html += '<style id="jspsych-survey-multi-choice-css">';
      html += ".jspsych-survey-multi-choice-question { display: flex; text-align: left; border-bottom: 1px solid }" +
        ".jspsych-survey-multi-choice-text span.required {color: darkred;}" +
        ".jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-text {  text-align: center;}" +
        ".jspsych-survey-multi-choice-option { display: flex; justify-content: center; align-items: center; line-height: 2; padding: 1rem 0; }" +
        ".jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-option {  width: 100%; border-left: 1px solid;}" +
        ".jspsych-survey-highlight { cursor: pointer; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }" +
        "#jspsych-survey-multi-choice-11 { border-bottom: none; }" +
        ".form-radio { top: 0; }" +
        ".jspsych-survey-multi-choice-option-left { display: flex; width: 40%; text-align: left; border-right: 3px solid #fff; padding-bottom: 2rem; }" +
        ".jspsych-survey-multi-choice-option-right { display: flex; width: 60%; justify-content: space-around; }" +
        ".jspsych-survey-multi-choice-form { max-width: 1000px; }" +
        ".jspsych-btn { margin: 100px 0; }" +
        ".jspsych-content { margin-top: 130px;}" +
        "ul {list-style: none}" +
        ".jspsych-survey-multi-choice { margin-top: 10rem; }" +
        ".jspsych-survey-multi-choice-number { display: flex; height: 100%; width: 30px; text-align: center; justify-content: center; }" +
        ".jspsych-survey-multi-choice-preamble { text-align: left; max-width: 1000px; padding-bottom: 1rem; }" +
        ".jspsych-survey-multi-choice-instructions { display: flex; justify-content: space-between; border-bottom: 3px solid; font-weight: bold; }" +
        ".jspsych-survey-multi-choice-instructions ul { display: flex; justify-content: space-between; padding-inline-start: 0; margin-bottom: 0; width: 60%; }" +
        ".jspsych-survey-multi-choice-instructions li { display: flex; justify-content: center; border-left: 1px solid; width: 100%; align-items: center; padding: 2rem 0; }" +
        "label.jspsych-survey-multi-choice-text input[type='radio'] {margin-right: 1em;}" +
        ".jspsych-survey-highlight { width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }" +
        "p { margin: 0 0 0px; }" +
        "@media (max-width: 900px) {" +
        ".jspsych-survey-multi-choice-instructions li { font-size: 15px; }" +
        "}" +
        "@media (max-width: 700px) {" +
          ".jspsych-survey-multi-choice-instructions li { font-size: 2vw; }" +
          ".jspsych-survey-multi-choice-option-left { width: 30%; }" +
          ".jspsych-survey-multi-choice-option-right { width: 70%; }" +
          ".jspsych-survey-multi-choice-instructions ul { width: 70%; }" +
          ".jspsych-survey-multi-choice-number { width: 25px; }" +
        "}"
      html += '</style>';
       
      // fixed heder
      html += 
        '<header>' +
        '<nav class="navbar navbar-inverse navbar-fixed-top">' +
        '<div class="container-fluid">' +
        '<div class="navbar-header">' +
        '<p class="navbar-text"><b>' + plugin.info.name + '</b></p>' +
        '</div>' +
        '</div>' +
        '</nav>' +
        '</header>';
  
      // show preamble text
      if (trial.preamble !== null) {
        html += '<div id="jspsych-survey-multi-choice-preamble" class="jspsych-survey-multi-choice-preamble">' + trial.preamble + '</div>';
      }
  
      // form element
      html += '<div id="' + plugin_id_name + '">';
      html += '<form id="jspsych-survey-multi-choice-form" class="jspsych-survey-multi-choice-form">';
  
      // column titles
      html +=
        `<div id="jspsych-survey-multi-choice-preamble" class="jspsych-survey-multi-choice-instructions">
            <div class="jspsych-survey-multi-choice-option-left"></div>
            <ul>
              <li><div>Never</div></li>
              <li><div>Rarely</div></li>
              <li><div>Sometimes</div></li>
              <li><div>Often</div></li>
              <li><div>Very often</div></li>
            </ul>
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
        html += '<div class="jspsych-survey-multi-choice-option-left"><span class="jspsych-survey-multi-choice-number">' + (i + 1) + '.</span><p class="jspsych-survey-multi-choice-text survey-multi-choice jspsych-survey-multi-choice-question-text" style="text-align: left; padding: 0 10px; width: 100%;">' + question.prompt
        // question.required
        html += '</p></div>';
        html += '<div class="jspsych-survey-multi-choice-option-right">';
  
        // create option radio buttons
        for (var j = 0; j < question.options.length; j++) {
          // add label and question text
          var option_id_name = "jspsych-survey-multi-choice-option-" + question_id + "-" + j;
          var input_name = 'jspsych-survey-multi-choice-response-' + question_id;
          var input_id = 'jspsych-survey-multi-choice-response-' + question_id + '-' + j;
  
          var required_attr = question.required ? 'required' : '';
  
          // add radio button container
          html += '<div id="' + option_id_name + '" class="jspsych-survey-multi-choice-option">';
          html += '<label hidden class="jspsych-survey-multi-choice-text" for="' + input_id + '">' + question.options[j] + '</label>';
          html += '<input hidden type="radio" name="' + input_name + '" data-time-stamp="Q' + (i+1) + '" data-question-number="Q' + (i+1) +'A' + (j+1) +'" id="' + input_id + '" class="form-radio" value="' + trial.title[j] + '" ' + required_attr + '></input>';
          html += '</div>';
        }
  
        html += '</div></div>';
      }
  
      // add submit button
      html += '<input type="submit" id="' + plugin_id_name + '-next" class="' + plugin_id_name + ' jspsych-btn"' + (trial.button_label ? ' value="' + trial.button_label + '"' : '') + '></input>';
  
  
      html += '</form>';
      
      // add modal
      html +=
        `<div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
              <div class="modal__overlay" tabindex="-1">
                <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                  <header class="modal__header">
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                  </header>
                  <main class="modal__content" id="modal-1-content">
                    <p>${popup_text_WBF}</p>
                  </main>
                  <footer class="modal__footer">
                    <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                  </footer>
                </div>
              </div>
          </div>`;
  
      // render
      display_element.innerHTML = html;
  
      // function to handle responses by the subject
      var after_response = function (info) {
  
        if (info.key_release === undefined) {
          response.trial_events.push({
            "event_type": "key press",
            "event_raw_details": info.key,
            "event_converted_details": jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key) + ' key pressed',
            "timestamp": jsPsych.totalTime(),
            "time_elapsed": jsPsych.totalTime() - timestamp_onload
          });

          if(info.el) {
            if(info.el.dataset.timeStamp) {
              trial.time_stamp[info.el.dataset.timeStamp] = jsPsych.totalTime();
            }
            if(info.el.dataset.questionNumber) {
              response.trial_events.push({
                "event_type": "answer displayed",
                "event_raw_details": info.el.dataset.questionNumber,
                "event_converted_details": info.el.dataset.questionNumber + ' answer displayed',
                "timestamp": jsPsych.totalTime(),
                "time_elapsed": jsPsych.totalTime() - timestamp_onload
              });
            }
          }
        } else {
          response.trial_events.push({
            "event_type": "key release",
            "event_raw_details": info.key_release,
            "event_converted_details": jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key_release) + ' key released',
            "timestamp": jsPsych.totalTime(),
            "time_elapsed": jsPsych.totalTime() - timestamp_onload
          });
        }
      };

       // save timestamp on input click
      $("input[type=radio]").on("click change touchstart",function(){
        var time_stamp_key = $(this).data('time-stamp'); 
        if(time_stamp_key) {
          trial.time_stamp[time_stamp_key] = jsPsych.totalTime();
        };
      });
      
      // form functionality
      document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        response.trial_events.push({
          "event_type": "button clicked",
          "event_raw_details": 'Submit',
          "event_converted_details": '"Submit" selected',
          "timestamp": jsPsych.totalTime(),
          "time_elapsed": jsPsych.totalTime() - timestamp_onload
        });

        // create object to hold responses
        var question_data = {};
        var timestamp_data = {};
        for (var i = 0; i < trial.questions.length; i++) {
          var match = display_element.querySelector('#jspsych-survey-multi-choice-' + i);
          var id = i + 1;
          if (match.querySelector("input[type=radio]:checked") !== null) {
            var val = match.querySelector("input[type=radio]:checked").value;
            $(match).find('.jspsych-survey-multi-choice-question-text').removeClass('survey-error-after');
            $(match).find('.jspsych-survey-multi-choice-number').removeClass('survey-error-text');
          } else {
            var val = "";
            $(match).find('.jspsych-survey-multi-choice-question-text').addClass('survey-error-after');
            $(match).find('.jspsych-survey-multi-choice-number').addClass('survey-error-text');
          }
          var obje = {};
          var name = id;
          if (match.attributes['data-name'].value !== '') {
            name = match.attributes['data-name'].value;
          }
          obje[name] = val;
          timestamp_data[name] = trial.time_stamp['Q' + id];
          Object.assign(question_data, obje);
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
            "timestamp": JSON.stringify(timestamp_data),
            "time_stamp": JSON.stringify(trial.time_stamp),
            "question_order": JSON.stringify(question_order),
            "events": JSON.stringify(response.trial_events)
          };
  
          // clear the display
          display_element.innerHTML = '';
  
          // next trial
          jsPsych.finishTrial(trial_data);
        } else {
          // show modal, register events
          MicroModal.show('modal-1', {
            onShow() {
              response.trial_events.push({
                "event_type": "error message",
                "event_raw_details": 'Error message',
                "event_converted_details": 'popup triggered by incomplete WBF question',
                "timestamp": jsPsych.totalTime(),
                "time_elapsed": jsPsych.totalTime() - timestamp_onload
              });
            },
            onClose() {
              response.trial_events.push({
                "event_type": "popup closed",
                "event_raw_details": 'Close',
                "event_converted_details": trial.event_converted_details,
                "timestamp": jsPsych.totalTime(),
                "time_elapsed": jsPsych.totalTime() - timestamp_onload
              });
            }
          });
        }
  
      });
  
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