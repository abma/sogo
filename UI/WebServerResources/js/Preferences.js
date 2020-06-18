!function(){"use strict";function e(e,t){e.state("preferences",{abstract:!0,views:{preferences:{templateUrl:"preferences.html",controller:"PreferencesController",controllerAs:"app"}}}).state("preferences.general",{url:"/general",views:{module:{templateUrl:"generalPreferences.html"}}}).state("preferences.calendars",{url:"/calendars",views:{module:{templateUrl:"calendarsPreferences.html"}}}).state("preferences.addressbooks",{url:"/addressbooks",views:{module:{templateUrl:"addressbooksPreferences.html"}}}).state("preferences.mailer",{url:"/mailer",views:{module:{templateUrl:"mailerPreferences.html"}}}),t.rules.otherwise("/general")}function t(e,t,a,r){e.DebugEnabled||r.defaultErrorHandler(function(){}),a.onError({to:"preferences.**"},function(e){"preferences"==e.to().name||e.ignored()||(t.error("transition error to "+e.to().name+": "+e.error().detail),r.go({state:"preferences"}))})}angular.module("SOGo.PreferencesUI",["ui.router","sgCkeditor","angularFileUpload","SOGo.Common","SOGo.MailerUI","SOGo.ContactsUI","SOGo.Authentication","as.sortable"]).config(e).run(t),e.$inject=["$stateProvider","$urlServiceProvider"],t.$inject=["$window","$log","$transitions","$state"]}(),function(){"use strict";function e(s,e,t,n,a,r,i,o,c,d){var f=this,u=new r({id:c,security:o.security});function h(){f.account.security&&f.account.security.hasCertificate&&u.$certificate().then(function(e){f.certificate=e},function(){delete f.account.security.hasCertificate})}function p(e){var t=0<e.type.indexOf("pkcs12")||/\.(p12|pfx)$/.test(e.name);return f.form.certificateFilename.$setValidity("fileformat",t),t}f.defaultPort=143,f.defaults=i,f.account=o,f.accountId=c,f.customFromIsReadonly=function(){return!(0<c)&&!d},f.onBeforeUploadCertificate=function(e){f.form=e,f.uploader.clearQueue()},f.removeCertificate=function(){u.$removeCertificate().then(function(){delete f.account.security.hasCertificate})},f.importCertificate=function(){f.uploader.queue[0].formData=[{password:f.certificatePassword}],f.uploader.uploadItem(0)},f.cancel=function(){e.cancel()},f.save=function(){e.hide()},f.hostnameRE=0<c?/^(?!(127\.0\.0\.1|localhost(?:\.localdomain)?)$)/:/./,f.ckConfig={autoGrow_minHeight:70,toolbar:[["Bold","Italic","-","Link","Font","FontSize","-","TextColor","BGColor","Source"]],language:i.LocaleCode},f.account.encryption?"ssl"==f.account.encryption&&(f.defaultPort=993):f.account.encryption="none",h(),f.uploader=new t({url:[a.activeUser("folderURL")+"Mail",c,"importCertificate"].join("/"),autoUpload:!1,queueLimit:1,filters:[{name:p,fn:p}],onAfterAddingFile:function(e){f.certificateFilename=e.file.name},onSuccessItem:function(e,t,a,r){this.clearQueue(),s(function(){_.assign(f.account,{security:{hasCertificate:!0}})}),h()},onErrorItem:function(e,t,a,r){n.alert(l("Error"),l("An error occurred while importing the certificate. Verify your password."))}})}e.$inject=["$timeout","$mdDialog","FileUploader","Dialog","sgSettings","Account","defaults","account","accountId","mailCustomFromEnabled"],angular.module("SOGo.PreferencesUI").controller("AccountDialogController",e)}(),function(){"use strict";function e(e,t,a,r,s,n){var i=this,o=t.sieveCapabilities,c=t.forwardEnabled;t.vacationEnabled;i.filter=r,i.mailboxes=s,i.labels=n,i.cancel=function(){a.cancel()},i.hasRulesAndActions=function(){var e=[i.filter.actions];"allmessages"!=i.filter.match&&e.push(i.filter.rules);return _.every(e,function(e){return e&&0<e.length})},i.save=function(e){a.hide()},i.addMailFilterRule=function(e){i.filter.rules||(i.filter.rules=[]);i.filter.rules.push({field:"subject",operator:"contains"})},i.removeMailFilterRule=function(e){i.filter.rules.splice(e,1)},i.addMailFilterAction=function(e){i.filter.actions||(i.filter.actions=[]);i.filter.actions.push({method:"discard"})},i.removeMailFilterAction=function(e){i.filter.actions.splice(e,1)},i.fieldLabels={subject:l("Subject"),from:l("From"),to:l("To"),cc:l("Cc"),to_or_cc:l("To or Cc"),size:l("Size (Kb)"),header:l("Header")},-1<o.indexOf("body")&&(i.fieldLabels.body=l("Body")),i.methodLabels={discard:l("Discard the message"),keep:l("Keep the message"),stop:l("Stop processing filter rules")},c&&(i.methodLabels.redirect=l("Forward the message to")),-1<o.indexOf("reject")&&(i.methodLabels.reject=l("Send a reject message")),-1<o.indexOf("fileinto")&&(i.methodLabels.fileinto=l("File the message in")),(-1<o.indexOf("imapflags")||-1<o.indexOf("imap4flags"))&&(i.methodLabels.addflag=l("Flag the message with")),i.numberOperatorLabels={under:l("is under"),over:l("is over")},i.textOperatorLabels={is:l("is"),is_not:l("is not"),contains:l("contains"),contains_not:l("does not contain"),matches:l("matches"),matches_not:l("does not match")},-1<o.indexOf("regex")&&(i.textOperatorLabels.regex=l("matches regex"),i.textOperatorLabels.regex_not=l("does not match regex"))}e.$inject=["$scope","$window","$mdDialog","filter","mailboxes","labels"],angular.module("SOGo.PreferencesUI").controller("FiltersDialogController",e)}(),function(){"use strict";function e(c,d,a,e,r,s,n,f,i,o,u,h,t,p,m){var g=this,C=[];(new Date).beginOfDay();function w(){var r;C.length||i.activeUser("path").mail&&(r=new t({id:0})).$getMailboxes().then(function(){for(var e=r.$flattenMailboxes({all:!0}),t=-1,a=e.length;++t<a;)C.push(e[t])})}this.$onInit=function(){this.preferences=p,this.passwords={newPassword:null,newPasswordConfirmation:null},this.timeZonesList=d.timeZonesList,this.timeZonesSearchText="",this.sieveVariablesCapability=0<=d.sieveCapabilities.indexOf("variables"),this.addressesSearchText="",this.mailLabelKeyRE=new RegExp(/^(?!^_\$)[^(){} %*\"\\\\]*?$/),this.emailSeparatorKeys=[e.KEY_CODE.ENTER,e.KEY_CODE.TAB,e.KEY_CODE.COMMA,e.KEY_CODE.SEMICOLON],p.defaults.SOGoAlternateAvatar&&(h.$alternateAvatar=p.defaults.SOGoAlternateAvatar),this.preferences.hasActiveExternalSieveScripts(),this.updateVacationDates()},this.go=function(e,t){t.$valid&&(r("gt-md")||s("left").close(),a.go("preferences."+e))},this.onLanguageChange=function(e){e.$valid&&u.confirm(l("Warning"),l("Save preferences and reload page now?"),{ok:l("Yes"),cancel:l("No")}).then(function(){g.save(e,{quick:!0}).then(function(){d.location.reload(!0)})})},this.resetCalendarCategories=function(e){this.preferences.defaults.SOGoCalendarCategories=_.keys(d.defaultCalendarCategories),this.preferences.defaults.SOGoCalendarCategoriesColorsValues=_.values(d.defaultCalendarCategories),e.$setDirty()},this.addCalendarCategory=function(e){var t=_.indexOf(this.preferences.defaults.SOGoCalendarCategories,l("New category"));t<0&&(this.preferences.defaults.SOGoCalendarCategories.push(l("New category")),this.preferences.defaults.SOGoCalendarCategoriesColorsValues.push("#aaa"),e.$setDirty(),t=this.preferences.defaults.SOGoCalendarCategories.length-1),o("calendarCategory_"+t)},this.resetCalendarCategoryValidity=function(e,t){t["calendarCategory_"+e].$setValidity("duplicate",!0)},this.removeCalendarCategory=function(e,t){this.preferences.defaults.SOGoCalendarCategories.splice(e,1),this.preferences.defaults.SOGoCalendarCategoriesColorsValues.splice(e,1),t.$setDirty()},this.addContactCategory=function(e){var t=_.indexOf(this.preferences.defaults.SOGoContactsCategories,"");t<0&&(this.preferences.defaults.SOGoContactsCategories.push(""),t=this.preferences.defaults.SOGoContactsCategories.length-1),o("contactCategory_"+t),e.$setDirty()},this.removeContactCategory=function(e,t){this.preferences.defaults.SOGoContactsCategories.splice(e,1),t.$setDirty()},this.addMailAccount=function(e,t){var a;this.preferences.defaults.AuxiliaryMailAccounts.push({}),a=_.last(this.preferences.defaults.AuxiliaryMailAccounts),angular.extend(a,{isNew:!0,name:"",identities:[{fullName:"",email:""}],receipts:{receiptAction:"ignore",receiptNonRecipientAction:"ignore",receiptOutsideDomainAction:"ignore",receiptAnyAction:"ignore"}}),n.show({controller:"AccountDialogController",controllerAs:"$AccountDialogController",templateUrl:"editAccount?account=new",targetEvent:e,locals:{defaults:this.preferences.defaults,account:a,accountId:this.preferences.defaults.AuxiliaryMailAccounts.length-1,mailCustomFromEnabled:d.mailCustomFromEnabled}}).then(function(){t.$setDirty()}).catch(function(){g.preferences.defaults.AuxiliaryMailAccounts.pop()})},this.editMailAccount=function(e,t,a){var r=this.preferences.defaults.AuxiliaryMailAccounts[t];n.show({controller:"AccountDialogController",controllerAs:"$AccountDialogController",templateUrl:"editAccount?account="+t,targetEvent:e,locals:{defaults:this.preferences.defaults,account:r,accountId:t,mailCustomFromEnabled:d.mailCustomFromEnabled}}).then(function(){g.preferences.defaults.AuxiliaryMailAccounts[t]=r,a.$setDirty()},function(){})},this.removeMailAccount=function(e,t){this.preferences.defaults.AuxiliaryMailAccounts.splice(e,1),t.$setDirty()},this.resetMailLabelValidity=function(e,t){t["mailIMAPLabel_"+e].$setValidity("duplicate",!0)},this.addMailLabel=function(e){guid();this.preferences.defaults.SOGoMailLabelsColorsKeys.push("label"),this.preferences.defaults.SOGoMailLabelsColorsValues.push(["New label","#aaa"]),o("mailLabel_"+(_.size(this.preferences.defaults.SOGoMailLabelsColorsKeys)-1)),e.$setDirty()},this.removeMailLabel=function(e,t){this.preferences.defaults.SOGoMailLabelsColorsKeys.splice(e,1),this.preferences.defaults.SOGoMailLabelsColorsValues.splice(e,1),t.$setDirty()},this.addMailFilter=function(e,t){var a={match:"all",active:1};w(),n.show({templateUrl:"editFilter?filter=new",controller:"FiltersDialogController",controllerAs:"filterEditor",targetEvent:e,locals:{filter:a,mailboxes:C,labels:this.preferences.defaults.SOGoMailLabelsColors}}).then(function(){g.preferences.defaults.SOGoSieveFilters||(g.preferences.defaults.SOGoSieveFilters=[]),g.preferences.defaults.SOGoSieveFilters.push(a),t.$setDirty()})},this.editMailFilter=function(e,t,a){var r=angular.copy(this.preferences.defaults.SOGoSieveFilters[t]);w(),n.show({templateUrl:"editFilter?filter="+t,controller:"FiltersDialogController",controllerAs:"filterEditor",targetEvent:null,locals:{filter:r,mailboxes:C,labels:this.preferences.defaults.SOGoMailLabelsColors}}).then(function(){g.preferences.defaults.SOGoSieveFilters[t]=r,a.$setDirty()},_.noop)},this.removeMailFilter=function(e,t){this.preferences.defaults.SOGoSieveFilters.splice(e,1),t.$setDirty()},this.onFiltersOrderChanged=function(t){return this._onFiltersOrderChanged||(this._onFiltersOrderChanged=function(e){t.$setDirty()}),this._onFiltersOrderChanged},this.filterEmailAddresses=function(t){return _.filter(_.difference(d.defaultEmailAddresses,this.preferences.defaults.Vacation.autoReplyEmailAddresses),function(e){return 0<=e.toLowerCase().indexOf(t.toLowerCase())})},this.addDefaultEmailAddresses=function(e){var t=[];angular.isDefined(this.preferences.defaults.Vacation.autoReplyEmailAddresses)&&(t=this.preferences.defaults.Vacation.autoReplyEmailAddresses),this.preferences.defaults.Vacation.autoReplyEmailAddresses=_.union(d.defaultEmailAddresses,t),e.$setDirty()},this.userFilter=function(e,t){return!e||e.length<i.minimumSearchLength()?[]:h.$filter(e,t).then(function(e){return _.forEach(e,function(e){e.$$image||(e.image?e.$$image=e.image:e.$$image=g.preferences.avatar(e.c_email,40,{no_404:!0}))}),e})},this.manageSieveScript=function(e){this.preferences.hasActiveExternalSieveScripts(!1),e.$setDirty()},this.confirmChanges=function(e,t){var a;if(t.$dirty&&t.$valid){for(e.preventDefault(),e.stopPropagation(),a=e.target;"A"!=a.tagName;)a=a.parentNode;u.confirm(l("Unsaved Changes"),l("Do you want to save your changes made to the configuration?"),{ok:l("Save"),cancel:l("Don't Save")}).then(function(){g.save(t,{quick:!0}).then(function(){d.location=a.href})},function(){d.location=a.href})}},this.save=function(r,t){var e,s,a,n,i,o;if(s=!0,i=[],0<d.forwardConstraints&&angular.isDefined(this.preferences.defaults.Forward)&&this.preferences.defaults.Forward.enabled&&angular.isDefined(this.preferences.defaults.Forward.forwardAddress))for(a=this.preferences.defaults.Forward.forwardAddress,n=d.defaultEmailAddresses,_.forEach(n,function(e){var t=e.split("@")[1];t&&i.push(t.toLowerCase())}),e=0;e<a.length&&s;e++)o=a[e].split("@")[1].toLowerCase(),i.indexOf(o)<0&&1==d.forwardConstraints?(u.alert(l("Error"),l("You are not allowed to forward your messages to an external email address.")),s=!1):0<=i.indexOf(o)&&2==d.forwardConstraints?(u.alert(l("Error"),l("You are not allowed to forward your messages to an internal email address.")),s=!1):2==d.forwardConstraints&&0<d.forwardConstraintsDomains.length&&d.forwardConstraintsDomains.indexOf(o)<0&&(u.alert(l("Error"),l("You are not allowed to forward your messages to this domain:")+" "+o),s=!1);return this.preferences.defaults.SOGoMailLabelsColorsKeys.length==this.preferences.defaults.SOGoMailLabelsColorsValues.length&&this.preferences.defaults.SOGoMailLabelsColorsKeys.length==_.uniq(this.preferences.defaults.SOGoMailLabelsColorsKeys).length||(u.alert(l("Error"),l("IMAP labels must have unique names.")),_.forEach(this.preferences.defaults.SOGoMailLabelsColorsKeys,function(e,t,a){r["mailIMAPLabel_"+t].$dirty&&(a.indexOf(e)!=t||-1<a.indexOf(e,t+1))&&(r["mailIMAPLabel_"+t].$setValidity("duplicate",!1),s=!1)})),this.preferences.defaults.SOGoCalendarCategories.length!=_.uniq(this.preferences.defaults.SOGoCalendarCategories).length&&(u.alert(l("Error"),l("Calendar categories must have unique names.")),_.forEach(this.preferences.defaults.SOGoCalendarCategories,function(e,t,a){r["calendarCategory_"+t].$dirty&&(a.indexOf(e)!=t||-1<a.indexOf(e,t+1))&&(r["calendarCategory_"+t].$setValidity("duplicate",!1),s=!1)})),this.preferences.defaults.SOGoContactsCategories.length!=_.uniq(this.preferences.defaults.SOGoContactsCategories).length&&(u.alert(l("Error"),l("Contact categories must have unique names.")),_.forEach(this.preferences.defaults.SOGoContactsCategories,function(e,t,a){r["contactCategory_"+t].$dirty&&(a.indexOf(e)!=t||-1<a.indexOf(e,t+1))&&(r["contactCategory_"+t].$setValidity("duplicate",!1),s=!1)})),s?this.preferences.$save().then(function(e){t&&t.quick||(f.show(f.simple().content(l("Preferences saved")).position("bottom right").hideDelay(2e3)),r.$setPristine())}):c.reject()},this.canChangePassword=function(){return!!(this.passwords.newPassword&&0<this.passwords.newPassword.length&&this.passwords.newPasswordConfirmation&&this.passwords.newPasswordConfirmation.length&&this.passwords.newPassword==this.passwords.newPasswordConfirmation)},this.changePassword=function(){m.changePassword(this.passwords.newPassword).then(function(){var e=n.alert({title:l("Password"),content:l("The password was changed successfully."),ok:l("OK")});n.show(e).finally(function(){e=void 0})},function(e){var t=n.alert({title:l("Password"),content:e,ok:l("OK")});n.show(t).finally(function(){t=void 0})})},this.timeZonesListFilter=function(t){return _.filter(this.timeZonesList,function(e){return 0<=e.toUpperCase().indexOf(t.toUpperCase())})},this.updateVacationDates=function(){var e=this.preferences.defaults;e&&e.Vacation&&e.Vacation.enabled&&(this.toggleVacationStartDate(),this.toggleVacationEndDate())},this.toggleVacationStartDate=function(){var e;(e=this.preferences.defaults.Vacation).startDateEnabled&&(e.startDate||(e.startDate=new Date),e.endDateEnabled&&e.endDate&&e.startDate.getTime()>e.endDate.getTime()&&(e.startDate=new Date(e.endDate.getTime()),e.startDate.addDays(-1)))},this.toggleVacationEndDate=function(){var e;(e=this.preferences.defaults.Vacation).endDateEnabled&&(e.endDate||(e.endDate=new Date),e.startDateEnabled&&e.startDate&&e.endDate.getTime()<e.startDate.getTime()&&(e.endDate=new Date(e.startDate.getTime()),e.endDate.addDays(1)))},this.validateVacationStartDate=function(e){var t=g.preferences.defaults,a=!0;return t&&t.Vacation&&t.Vacation.enabled&&t.Vacation.startDateEnabled&&(a=!t.Vacation.endDateEnabled||!t.Vacation.endDate||e.getTime()<=t.Vacation.endDate.getTime()),a},this.validateVacationEndDate=function(e){var t=g.preferences.defaults,a=!0;return t&&t.Vacation&&t.Vacation.enabled&&t.Vacation.endDateEnabled&&(a=!t.Vacation.startDateEnabled||!t.Vacation.startDate||e.getTime()>=t.Vacation.startDate.getTime()),a}}e.$inject=["$q","$window","$state","$mdConstant","$mdMedia","$mdSidenav","$mdDialog","$mdToast","sgSettings","sgFocus","Dialog","User","Account","Preferences","Authentication"],angular.module("SOGo.PreferencesUI").controller("PreferencesController",e)}();
//# sourceMappingURL=Preferences.js.map