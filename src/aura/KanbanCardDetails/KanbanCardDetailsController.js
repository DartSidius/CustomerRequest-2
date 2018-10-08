/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    showDescriptionForm: function(component) {
        let isDescriptionFormOpened = component.get("v.isDescriptionFormOpened");
        isDescriptionFormOpened = !isDescriptionFormOpened;
        component.set("v.isDescriptionFormOpened", isDescriptionFormOpened);
    },
    showDateTimeForm: function(component) {
        let isDateTimeFormOpened = component.get("v.isDateTimeFormOpened");
        isDateTimeFormOpened = !isDateTimeFormOpened
        component.set("v.isDateTimeFormOpened", isDateTimeFormOpened);
    }
})