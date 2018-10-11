/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

trigger KanbanColumnTrigger on KanbanColumn__c (before delete) {

    KanbanColumnTriggerHandler kanbanColumnTriggerHandler = new KanbanColumnTriggerHandler();

    if(Trigger.isBefore) {
        if(Trigger.isDelete) {
            kanbanColumnTriggerHandler.onBeforeDelete(Trigger.old);
        }
    }

}