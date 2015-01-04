'use strict';

angular.module('sc.edit', [])
//    .factory('scEditOptions', function () {
//      return {
//        events: {
//          editionStart: 'focus',
//          editionEnd: 'blur'
//        },
//        placeholder: '',
//        onbeforesave: angular.noop,
//        onaftersave: angular.noop,
//        type: 'text'
//      };
//    })
    .directive('scEdit', ['$rootScope', function ($rootScope) {
        var events = {
          editionStart: 'focus',
          editionEnd: 'blur'
        };

        function cancelEvent(e) {
          e.stopPropagation();
          e.preventDefault();

          return e;
        }

        function ScEdit(type, element, ngModel, placeholder, onbeforesave, onaftersave) {
          this.type = type;
          this.element = element;
          this.ngModel = ngModel;
          this.placeholder = placeholder;
          this.onbeforesave = onbeforesave ? onbeforesave : angular.noop;
          this.onaftersave = onaftersave ? onaftersave : angular.noop;
          this.$data = ngModel.$viewValue;
          
          this.element.popover({
                  container: 'body',
                  trigger: 'manual'
                });
          
          this.setupEvents();
        }

        ScEdit.prototype.init = function () {
          this.element.html(this.ngModel.$isEmpty(this.ngModel.$viewValue) ? this.placeholder : this.ngModel.$viewValue);
        };

        ScEdit.prototype.onEditionStart = function (event) {
          this.element.html(this.$data || '');
        };

        ScEdit.prototype.getError = function () {
          return this.$data !== '' && this.onbeforesave({$data: this.$data});
        };
        
        ScEdit.prototype.onEditionEnd = function (event) {
          var errorMessage = this.getError();

          if (errorMessage) {
            cancelEvent(event);

            var popover = this.element.data('bs.popover');
            popover.options.content = errorMessage;
            this.element.popover('show');
            
          } else {
            this.element.popover('hide');
            
            this.commitValue(this.$data);
            this.onaftersave({$data: this.$data});
            this.init();
          }

          this.ngModel.$setValidity('scedit', !errorMessage);

          return !errorMessage;
        };

        ScEdit.prototype.commitValue = function (value) {
          var self = this;

          $rootScope.$apply(function () {
            self.ngModel.$setViewValue(value);
          });
        };

        ScEdit.prototype.onKeydown = function (e) {
          var cancel = false;
          
          if (e.keyCode === 27) {
            // escape
            this.element.html(this.ngModel.$viewValue || '');
            this.element.blur();
          } else if (e.keyCode === 13 && (this.type !== 'textarea')) {
            // enter
            cancel = true;
          }
          
          if(cancel) {
              cancelEvent(e);
          } else {
            this.$data = this.element.html();
          }
        };

        ScEdit.prototype.setupEvents = function () {
          var self = this;

          this.element.on('keydown', function (e) {
            return self.onKeydown(e);
          });

          this.element.on(events.editionStart, function (e) {
            return self.onEditionStart(e);
          });

          this.element.on(events.editionEnd, function (e) {
            return self.onEditionEnd(e);
          });
        };

        return {
          restrict: 'A', // only activate on element attribute
          scope: {
            placeholder: '=',
            onbeforesave: '&',
            onaftersave: '&',
            type: '@scEdit'
          },
          require: 'ngModel', // get a hold of NgModelController
          link: function (scope, element, attrs, ngModel) {
            var editor = new ScEdit(
                scope.type || 'text',
                element,
                ngModel,
                scope.placeholder,
                attrs.onbeforesave ? scope.onbeforesave : undefined,
                attrs.onaftersave ? scope.onaftersave : undefined);

            scope.$watch(function () {
              return ngModel.$viewValue;
            }, init);

            function init() {
              scope.$data = ngModel.$viewValue;
              return editor.init();
            }
          }
        };
      }]);