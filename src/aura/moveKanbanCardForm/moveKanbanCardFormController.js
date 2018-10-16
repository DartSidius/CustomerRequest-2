/**
 * Created by Vladyslav Lyfar on 10.10.2018.
 */
({
    doInit: function(component, event, helper) {
        helper.doInit(component);
    },
    selectKanbanBoard: function(component, event, helper) {
        helper.selectKanbanBoard(component);
    },
    updateKanbanCardColumn: function(component, event, helper) {
        helper.updateKanbanCardColumn(component);
    },
    cancelForm: function(component, event, helper) {
        helper.hideForm(component);
    }
})