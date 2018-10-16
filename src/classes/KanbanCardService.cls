/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanCardService {

    public KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.createNewKanbanCard(kanbanCard);
    }

    public KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.updateKanbanCard(kanbanCard);
    }

    public KanbanCard__c copyKanbanCard(KanbanCard__c kanbanCard) {
        KanbanCard__c newKanbanCard = kanbanCard.clone(false, true, true, false);
        return KanbanCardRepository.createNewKanbanCard(newKanbanCard);
    }

    public List<KanbanCard__c> getAllKanbanCards(Id columnId) {
        return KanbanCardRepository.getAllKanbanCardsByColumnId(columnId);
    }

    public KanbanCard__c deleteKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.deleteKanbanCard(kanbanCard);
    }

}