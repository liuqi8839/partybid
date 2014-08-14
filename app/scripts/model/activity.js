function Activity(activity, status, selected) {
    this.activity = activity;
    this.status = status;
    this.selected = selected;
}

Activity.prototype.save = function() {
    var activities = Activity.getActivities();
    activities.unshift(this);
    Activity.setActivities(activities);
};

Activity.prototype.pitchOn = function() {
    var activities = Activity.getActivities();
    _.findWhere(activities, {activity: this.activity}).selected = 1;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.unPitch = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {selected: ''}).selected = 2;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.runActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {selected: ''}).status = 1;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.stopActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {selected: ''}).status = 2;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.findRepeat = function(name) {
    var activities = Activity.getActivities();
    var findOn = _.some(activities,function(anyActivity){return anyActivity.activity === name});
    return findOn;
};

Activity.findBy = function(value){
    var activities = Activity.getActivities();
    return (_.findWhere(activities , value)|| {selected: ''});
};

Activity.setActivities = function (activities) {
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.getActivities = function () {
    return init_key('Activities');
};

Activity.hasActivities = function(){
    return (Activity.getActivities() != '');
};

Activity.hasOngoingActivity = function() {
    return (Activity.getOngoingActivity() != '');
};

Activity.hasSelectedActivity = function(){
    return (Activity.getSelectedActivity() != '');
};

Activity.getOngoingActivity = function()  {

    if(Activity.hasActivities() == true) {
        var activities = Activity.getActivities();
        var ongoing_activity = (_.findWhere(activities, {status: 1}) || {activity: ''}).activity;
    }
    return ongoing_activity;
};

Activity.getSelectedActivity = function() {
    if(Activity.hasActivities() == true) {
        var activities = Activity.getActivities();
        var selected_activity = (_.findWhere(activities, {selected: 1}) || {activity: ''}).activity;
    }
    return selected_activity;
};

