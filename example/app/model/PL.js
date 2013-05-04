Ext.define('AccordionListExample.model.PL', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'sales', type: 'number'},
            {name: 'expenses', type: 'number'},
            {name: 'profits', type: 'number'},
            {name: 'year', type: 'boolean'}
        ]
    }
});
