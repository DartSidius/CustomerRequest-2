/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanCardController {

    @AuraEnabled
    public static Boolean checkAuthorization() {
        return new AuthorizationService().checkAuthorization();
    }

    @AuraEnabled
    public static KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        return new KanbanCardService().createNewKanbanCard(kanbanCard);
    }

    @AuraEnabled
    public static KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        return new KanbanCardService().updateKanbanCard(kanbanCard);
    }

    @AuraEnabled
    public static KanbanCard__c copyKanbanCard(KanbanCard__c kanbanCard) {
        return new KanbanCardService().copyKanbanCard(kanbanCard);
    }

    @AuraEnabled
    public static KanbanCard__c deleteKanbanCard(KanbanCard__c kanbanCard) {
        return new KanbanCardService().deleteKanbanCard(kanbanCard);
    }

    @AuraEnabled
    public static KanbanFile__c saveKanbanCardFileToDropbox(Id kanbanCardId, String fileName, String base64File) {
        return new KanbanCardService().addAttachmentRelatedToKanbanCard(kanbanCardId, fileName, base64File);
    }

}