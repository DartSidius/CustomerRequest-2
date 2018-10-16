/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanColumnService {

    public List<KanbanColumn__c> getAllKanbanBoardColumns(Id boardId) {
        return KanbanColumnRepository.getAllKanbanColumnsByBoardId(boardId);
    }

    public KanbanColumn__c createNewKanbanColumn(KanbanColumn__c kanbanColumn) {
        return KanbanColumnRepository.createNewKanbanColumn(kanbanColumn);
    }

    public KanbanColumn__c updateKanbanColumn(KanbanColumn__c kanbanColumn) {
        return KanbanColumnRepository.updateKanbanColumn(kanbanColumn);
    }

    public KanbanColumn__c deleteKanbanColumn(KanbanColumn__c kanbanColumn) {
        return KanbanColumnRepository.deleteKanbanColumn(kanbanColumn);
    }

    public List<KanbanCard__c> deleteAllKanbanColumnCards(Id columnId) {
        List<KanbanCard__c> kanbanCardsToDelete = KanbanCardRepository.getAllKanbanCardsByColumnId(columnId);
        return KanbanCardRepository.deleteAllKanbanCards(kanbanCardsToDelete);
    }

    public KanbanColumn__c copyKanbanColumn(KanbanColumn__c kanbanColumn) {
        KanbanColumn__c newKanbanColumn = KanbanColumnRepository.createNewKanbanColumn(
                kanbanColumn.clone(false, true, true, false)
        );
        List<KanbanCard__c> kanbanColumnCards = KanbanCardRepository.getAllKanbanCardsByColumnId(kanbanColumn.Id);
        List<KanbanCard__c> clonedKanbanColumnCards = this.getClonedKanbanCards(kanbanColumnCards, newKanbanColumn);
        KanbanCardRepository.createNewKanbanCards(clonedKanbanColumnCards);
        return newKanbanColumn;
    }

    public void deleteAllRelatedChildCards(List<KanbanColumn__c> oldKanbanColumnList) {
        List<KanbanCard__c> relatedCardsToDelete = this.getAllRelatedCardsToDelete(oldKanbanColumnList);
        if(!relatedCardsToDelete.isEmpty()) {
            delete relatedCardsToDelete;
        }
    }

    private List<KanbanCard__c> getAllRelatedCardsToDelete(List<KanbanColumn__c> oldKanbanColumnList) {
        return KanbanCardRepository.getKanbanCardsByColumnsIds(oldKanbanColumnList);
    }

    private List<KanbanCard__c> getClonedKanbanCards(List<KanbanCard__c> kanbanCardsToClone, KanbanColumn__c newKanbanColumn) {
        List<KanbanCard__c> clonedKanbanColumnCards = new List<KanbanCard__c>();
        for(KanbanCard__c kanbanCard : kanbanCardsToClone) {
            KanbanCard__c newKanbanCard = kanbanCard.clone(false, true, true, false);
            newKanbanCard.KanbanColumn__c = newKanbanColumn.Id;
            clonedKanbanColumnCards.add(newKanbanCard);
        }
        return clonedKanbanColumnCards;
    }

}