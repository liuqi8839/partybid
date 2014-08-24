function Activity(activity, status, selected) {
    this.activity = activity;
    this.status = status;
    this.selected = selected;
}

Activity.prototype.pitchOn = function() {
    var activities = Activity.getActivities();
    _.findWhere(activities, {activity: this.activity} || {activity: ''}).selected = true;
    Activity.setActivities(activities);
};

Activity.prototype.unPitch = function() {
    var activities = Activity.getActivities();
    (_.findWhere(this.activities, {activity: this.activity}) || {activity: ''}).selected = false;
    Activity.setActivities(activities);
};

Activity.prototype.runActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {activity: ''}).status = true;
    Activity.setActivities(activities);
};

Activity.prototype.stopActivity = function() {
    var activities = Activity.getActivities();
    (_.findWhere(activities, {activity: this.activity}) || {activity: ''}).status = false;
    Activity.setActivities(activities);
};

Activity.prototype.findRepeat = function() {
    var newActivity = this.activity;
    return _.find(Activity.getActivities(), function(anyActivity) {
        return anyActivity.activity == newActivity;
    });
};

Activity.prototype.save = function() {
    var activities = Activity.getActivities();
    activities.unshift(this);
    Activity.setActivities(activities);
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
    return (Activity.getOngoingActivity().activity != '');
};

Activity.hasSelectedActivity = function(){
    return (Activity.getSelectedActivity().activity != '');
};

Activity.getOngoingActivity = function()  {
    return (_.findWhere(Activity.getActivities(), {status: true}) || {activity: ''});
};

Activity.getSelectedActivity = function() {
    return (_.findWhere(Activity.getActivities(), {selected: true}) || {activity: ''});
};

Activity.findBy = function(value){
    return (_.findWhere(Activity.getActivities(), value)|| [{activity: ''}]);
};