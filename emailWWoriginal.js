(async function(record, context, workflow){
    try{
      //const entityIdRes = await context.clientAPI.getEntityIdFromName({entity_name:'commercial'});
      const response = await context.clientAPI.getPdfByTemplate({
            fa_entity_id: '73cff2da-409c-4d3f-bdf6-c501765e76ad',
            instance_id: record.id, 
            template_id: 'DOC100001',
            current_date: new Date().getTime(),
            output_format: 'pdf',
            show_activity: false,
        });
            const user = context.agent.firstName;
            const time = new Date().getTime()
            const date = workflow.updatedBy.value;
        if (response.error) {
            await context.clientAPI.showErrorMessage(response.error);
        } else {
            const url = response.data.getPdfByTemplate.attachment_url;
            window.open(url, '_blank');
          	await  context.freeagent.addTask({
              "parent_entity_id": fa_entity_id,
              "note": `${user} sent quote on ${date} at ${time}`,
              
            })
            await context.clientAPI.showSuccessMessage("Generate Document Successfully!");
        }

        context.clientAPI.showModal("mailModal",
            {
                workEmail : record.field_values.quote_field37.value || ""
            }
        )
    } catch(e){
        await context.clientAPI.showErrorMessage(e);
    }
}(record, context));