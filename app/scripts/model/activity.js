function Activity(activity, status, selected) {
    this.activity = activity;
    this.status = status;
    this.selected = selected;
    this.activities = Activity.getActivities();
}

Activity.prototype.pitchOn = function() {
    _.findWhere(this.activities, {activity: this.activity} || {activity: ''}).selected = 1;
    Activity.setActivities(this.activities);
};

Activity.prototype.unPitch = function() {
    (_.findWhere(this.activities, {activity: this.activity}) || {activity: ''}).selected = 2;
    Activity.setActivities(this.activities);
};

Activity.prototype.runActivity = function() {
    (_.findWhere(this.activities, {activity: this.activity}) || {activity: ''}).status = 1;
    Activity.setActivities(this.activities);
};

Activity.prototype.stopActivity = function() {
    (_.findWhere(this.activities, {activity: this.activity}) || {activity: ''}).status = 2;
    Activity.setActivities(this.activities);
};

Activity.prototype.findRepeat = function() {
    var newActivity = this.activity;
    return _.find(Activity.getActivities(), function(anyActivity) {
        return anyActivity.activity == newActivity;
    });
};

Activity.prototype.save = function() {
    this.activities.unshift(this);
    Activity.setActivities(this.activities);
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
    return (_.findWhere(Activity.getActivities(), {status: 1}) || {activity: ''});
};

Activity.getSelectedActivity = function() {
    return (_.findWhere(Activity.getActivities(), {selected: 1}) || {activity: ''});
};

Activity.findBy = function(value){
    return (_.findWhere(Activity.getActivities(), value)|| [{activity: ''}]);
};