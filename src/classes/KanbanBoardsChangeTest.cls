/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

@isTest
public class KanbanBoardsChangeTest {

    @isTest
    static void TestColumnDeleteRelatedCards() {
        //generate data

        KanbanTestFactory.generateTestData(5);

        //make magic
        Test.startTest();

        delete [SELECT Id FROM KanbanColumn__c];

        Test.stopTest();

        //compare results
        System.assertEquals(0, [SELECT count() FROM KanbanCard__c]);
    }

    @isTest
    static void TestBoardDeleteRelatedCardsAndColumns() {
        //generate data

        KanbanTestFactory.generateTestData(5);

        //make magic
        Test.startTest();

        delete [SELECT Id FROM KanbanBoard__c];

        Test.stopTest();

        //compare results
        System.assertEquals(0, [SELECT count() FROM KanbanColumn__c]);
        System.assertEquals(0, [SELECT count() FROM KanbanCard__c]);
    }

}