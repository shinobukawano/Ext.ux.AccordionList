
describe('Ext.ux.AccordionList grouped', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=grouped]');
    t.cq1('tabpanel').setActiveItem(5);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.chain({
            action: 'wait',
            delay: 1000
        }, function() {
            t.expect(accordionList.getCount()).toEqual(5);
            t.expect(accordionList.getAllCount()).toEqual(10);
        });
    });

});
