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
    _.findWhere(activities, {activity: this.activity} || {activity: ''} ).selected = 1;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.unPitch = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {activity: ''}).selected = 2;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.runActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {activity: ''}).status = 1;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.prototype.stopActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {activity: ''}).status = 2;
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.findRepeat = function(name) {
    var activities = Activity.getActivities();
    return _.some(activities , function(anyActivity) {
        return anyActivity.activity === name
    });
};

Activity.findBy = function(value){
    var activities = Activity.getActivities();
    return (_.findWhere(activities , value)|| [{activity: ''}]);
};

Activity.setActivities = function (activities) {
    localStorage['Activities'] = JSON.stringify(activities);
};

Activity.getActivities = function () {
    return init_key('Activities');
};

Activity.hasActivities = function(){
    return (Activity.getActivities() != []);
};

Activity.hasOngoingActivity = function() {
    return (Activity.getOngoingActivity().activity != '');
};

Activity.hasSelectedActivity = function(){
    return (Activity.getSelectedActivity().activity != '');
};

Activity.getOngoingActivity = function()  {
    var activities = Activity.getActivities();
    return (_.findWhere(activities, {status: 1}) || {activity: ''});
};

Activity.getSelectedActivity = function() {
    var activities = Activity.getActivities();
    return (_.findWhere(activities, {selected: 1}) || {activity: ''});
};