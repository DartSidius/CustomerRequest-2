/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanCardController {

    @AuraEnabled
    public static KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        insert kanbanCard;
        return kanbanCard;
    }

}