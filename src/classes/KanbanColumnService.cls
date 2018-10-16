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

    public void deleteAllRelatedChildCards(List<KanbanColumn__c> oldKanbanColumnList) {
        List<KanbanCard__c> relatedCardsToDelete = this.getAllRelatedCardsToDelete(oldKanbanColumnList);
        if(!relatedCardsToDelete.isEmpty()) {
            delete relatedCardsToDelete;
        }
    }

    private List<KanbanCard__c> getAllRelatedCardsToDelete(List<KanbanColumn__c> oldKanbanColumnList) {
        return KanbanCardRepository.getKanbanCardsByColumnsIds(oldKanbanColumnList);
    }

}