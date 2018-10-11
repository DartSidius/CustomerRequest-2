/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

trigger KanbanBoardTrigger on KanbanBoard__c(before delete) {

    KanbanBoardTriggerHandler kanbanBoardTriggerHandler = new KanbanBoardTriggerHandler();

    if(Trigger.isBefore) {
        if(Trigger.isDelete) {
            kanbanBoardTriggerHandler.onBeforeDelete(Trigger.old);
        }
    }
}