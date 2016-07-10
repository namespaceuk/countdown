import { Template } from 'meteor/templating';
import './countdown.html';

var countdown = new ReactiveCountdown(10);
var ended = false;


//this.teamIndex = new ReactiveVar(-1);

countdown.start(function () {
});
countdown.stop();

function getMinutes(seconds) {
    var mins = Math.floor(seconds / 60);
    return mins;
}

function getSecs(seconds) {
    var secs = Math.floor(seconds % 60);
    if (secs === 0) {
        ended = true;
    }
    return secs;
}

Template.body.helpers({
    ended: function () {
        return countdown.get() === 0;
    }
});

Template.cdown.helpers({
    getSeconds: function () {
        return getSecs(countdown.get());
    },
    getMins: function () {
        return getMinutes(countdown.get());
    }
});

Template.team.onCreated(function teamOnCreated() {
    // counter starts at 0
    this.teamIndex = new ReactiveVar(0);
    this.teamNames = ['', 'Jamie', 'Darren', 'Thomas', 'HT', 'Ray', 'Richard'];
});

Template.team.helpers({
    name: function () {
        // return teamNames[teamIndex];
        return Template.instance().teamNames[Template.instance().teamIndex.get()];
    }
});

Template.team.events({
    'click button'(event, instance) {
        // increment the counter when button is clicked
        countdown.stop();
        instance.teamIndex.set(instance.teamIndex.get() + 1);
        countdown.start(function () {
        });

    }
});




