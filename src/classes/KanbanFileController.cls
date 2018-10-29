/**
 * Created by Vladyslav Lyfar on 29.10.2018.
 */

public with sharing class KanbanFileController {

    @AuraEnabled
    public static KanbanFile__c deleteKanbanFile(KanbanFile__c kanbanFile) {
        return new KanbanFileService().deleteKanbanFile(kanbanFile);
    }

}