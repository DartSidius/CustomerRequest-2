/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
@isTest
public class KanbanBoardControllerTest {
    @isTest
    static void TestGetBoardAllColumns() {
        //Ppepare data

        List<KanbanBoard__c> kanbanBoards = KanbanTestFactory.generateBoards(2);
        List<KanbanColumn__c> kanbanColumns = KanbanTestFactory.generateColumns(5, kanbanBoards);

        //make magic
        Test.startTest();
        List<KanbanColumn__c> result = KanbanBoardController.getAllKanbanBoardColumns(kanbanBoards.get(0).Id);
        Test.stopTest();

        //compare results
        System.assertEquals(5, result.size());
    }
    @isTest
    static void TestGetAllBoardsTest() {
        //Ppepare data

        List<KanbanBoard__c> kanbanBoards = KanbanTestFactory.generateBoards(5);

        //make magic
        Test.startTest();
        List<KanbanBoard__c> result = KanbanBoardController.getAllKanbanBoards();
        Test.stopTest();

        //compare results
        System.assertEquals(5, result.size());
    }
}