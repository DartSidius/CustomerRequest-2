/**
 * Created by Vladyslav Lyfar on 01.11.2018.
 */

trigger KanbanFileTrigger on KanbanFile__c (before delete) {

    if(Trigger.isDelete) {
        if(Trigger.isBefore) {
            KanbanFileTriggerHandler.onBeforeDelete(Trigger.old);
        }
    }

}