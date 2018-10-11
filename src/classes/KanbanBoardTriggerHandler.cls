/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanBoardTriggerHandler {

    KanbanBoardService kanbanBoardService;

    public KanbanBoardTriggerHandler() {
        this.kanbanBoardService = new KanbanBoardService();
    }

    public void onBeforeDelete(List<KanbanBoard__c> oldKanbanBoardList) {
        this.kanbanBoardService.deleteAllRelatedChildColumns(oldKanbanBoardList);
    }

}