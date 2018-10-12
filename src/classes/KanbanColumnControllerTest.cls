/**
 * Created by Vladyslav Lyfar on 12.10.2018.
 */
@isTest
public class KanbanColumnControllerTest {
    @isTest
    static void  TestCreateNewKanbanColumn() {
        //prepare data

        List<KanbanBoard__c> kanbanBoards = KanbanTestFactory.generateBoards(1);
        KanbanColumn__c kanbanColumn = new KanbanColumn__c(
                Name = 'Test',
                KanbanBoard__c = kanbanBoards.get(0).Id
        );

        //make magic
        Test.startTest();
        KanbanColumnController.createNewKanbanColumn(kanbanColumn);
        Test.stopTest();

        //compare results

        System.assertEquals(1, [SELECT Count() FROM KanbanColumn__c WHERE KanbanBoard__c = :kanbanBoards.get(0).Id]);
    }
    @isTest
    static void TestGetAllKanbanCards() {
        //prepare data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(5);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(5, boards);
        List<KanbanCard__c> cards = KanbanTestFactory.generateCards(5, columns);

        //make magic
        Test.startTest();
        List<KanbanCard__c> result = KanbanColumnController.getAllKanbanCards(columns.get(0).Id);
        Test.stopTest();

        //compare results

        System.assertEquals(5, result.size());
    }
    @isTest
    static void TestUpdateKanbanColumn() {
        //prepare data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(2);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(5, boards);

        columns.get(0).KanbanBoard__c = boards.get(1).Id;

        //make magic
        Test.startTest();
        KanbanColumnController.updateKanbanColumn(columns.get(0));
        Test.stopTest();

        //compare results

        System.assertEquals(6, [SELECT Count() FROM KanbanColumn__c WHERE KanbanBoard__c = :boards.get(1).Id]);
    }
}