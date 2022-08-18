(async function(record, context){
    try{
      //const entityIdRes = await context.clientAPI.getEntityIdFromName({entity_name:'commercial'});
      const user = record.field_values.updated_by.display_value;
      const dAndT = new Date()
      const dateAndTime = String(dAndT.toLocaleString())
      const response = await context.clientAPI.getPdfByTemplate({
            fa_entity_id: '73cff2da-409c-4d3f-bdf6-c501765e76ad',
            instance_id: record.id, 
            template_id: 'DOC100001',
            current_date: new Date().getTime(),
            output_format: 'pdf',
            show_activity: false,
        });
        if (response.error) {
            await context.clientAPI.showErrorMessage(response.error);
        } else {
            const url = response.data.getPdfByTemplate.attachment_url;
            window.open(url, '_blank');
            await context.clientAPI.showSuccessMessage("Generate Document Successfully!");
        }
  
        context.clientAPI.showModal("mailModal",
            {
                workEmail : record.field_values.quote_field37.value || ""
            }
        )
  
       await context.clientAPI.createEntity({
        entity: "note_fa",
          field_values: {
            note_fa_field0: `${user} has sent a quote email on ${dateAndTime}`,
            note_fa_field1: '73cff2da-409c-4d3f-bdf6-c501765e76ad',
            note_fa_field2: record.id
          }
        })

    await context.clientAPI.updateEntity({
        entity: "quote",
          id: record.id,
        field_values:{
           quote_field63: '408ff3df-94dc-4981-acc3-7760900a57aa',
        }
    })
    } catch(e){
        await context.clientAPI.showErrorMessage(e);
    } 
  }(record, context));