/**
 * Created by Vladyslav Lyfar on 16.10.2018.
 */
({
    doInit: function(component, event, helper) {
        helper.doInit(component);
    },
    cancelForm: function(component, event, helper) {
        helper.hideForm(component);
    },
    copyKanbanColumn: function(component, event, helper) {
        helper.copyKanbanColumn(component);
    }
})