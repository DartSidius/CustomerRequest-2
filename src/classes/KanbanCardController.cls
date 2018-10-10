/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanCardController {

    @AuraEnabled
    public static KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        insert kanbanCard;
        return kanbanCard;
    }

    @AuraEnabled
    public static KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        update kanbanCard;
        return kanbanCard;
    }

    @AuraEnabled
    public static KanbanCard__c copyKanbanCard(KanbanCard__c kanbanCard) {
        KanbanCard__c newKanbanCard = kanbanCard.clone(false, true, true, false);
        insert newKanbanCard;
        return newKanbanCard;
    }

}