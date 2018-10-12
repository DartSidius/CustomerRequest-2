/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanBoardService {

    public List<KanbanBoard__c> getAllKanbanBoards() {
        return KanbanBoardRepository.getAllKanbanBoards();
    }

    public void deleteAllRelatedChildColumns(List<KanbanBoard__c> oldKanbanBoardList) {
        List<KanbanColumn__c> relatedColumnsToDelete = this.getAllRelatedColumnsToDelete(oldKanbanBoardList);
        if(!relatedColumnsToDelete.isEmpty()) {
            delete relatedColumnsToDelete;
        }
    }

    private List<KanbanColumn__c> getAllRelatedColumnsToDelete(List<KanbanBoard__c> oldKanbanBoardList) {
        return KanbanColumnRepository.getKanbanColumnsByBoardRecordsIds(oldKanbanBoardList);
    }

}