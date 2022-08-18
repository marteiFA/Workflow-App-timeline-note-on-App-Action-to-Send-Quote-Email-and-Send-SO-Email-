
(async function(record, context){
  try{
    //const entityIdRes = await context.clientAPI.getEntityIdFromName({entity_name:'commercial'});
    const user = record.field_values.quote_field5.display_value;
    const dateAndTime = record.field_values.updated_at.formatted_value;
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
          note_fa_field0: `${user} has sent a quote email at ${dateAndTime}`,
          note_fa_field1: '73cff2da-409c-4d3f-bdf6-c501765e76ad',
          note_fa_field2: record.id
        }
      })
  } catch(e){
      await context.clientAPI.showErrorMessage(e);
  }
}(record, context));

// ________________________________________________________________________
// create entity 
// --workflow Status Value
// - id : "85d320a1-387e-4414-83ab-8db55e6fb3d1"
// - value : "b06ffaed-ae6c-4a40-8fa4-bb95a793c588"
// - displayValue : "Open Quote"
// - formattedValue : "Open Quote"
// - type : "reference join"
// - childLabel : "Workflow Status(Product for Quote)"
// - workflowStatusFormatted : "Open Quote"
// - workflowStatus : "Open Quote"

// ________________________________________________________________________


// WALEED
//______________________________________________________________________________________
// (async function (workflow, context) {
//     const entityId = context.appConfiguration.faEntityId;
//     const templateId = "2fbd7ef5-f284-422b-8919-22bb38d0d9a0";
//     const instanceId = workflow.entityInstance.instanceId;
  
//     const createNote = (note) => {
//       let variables = {
//         "assignedto": [],
//         "closed_at": null,
//         "contacts": [],
//         "description": `<div>${note}</div>`,
//         "due_date": new Date(),
//         "due_option": null,
//         "logo_name": null,
//         "note": `<div>${note}</div>`,
//         "parent_entity_id": entityId,
//         "parent_reference_id": instanceId,
//         "source_name": "Automated",
//         "status": "closed",
//         "task_mentions": [],
//         "type": "Note"
//       };
//       return context.freeagent.addTask(variables);
//     }
  
//     const getEmailTemplate = async (templateId) => {
//       let variables = {
//         id: templateId
//       };
//       let template = await context.freeagent.emailTemplates(variables);
//       return template[0];
//     }
  
//     const sendEmail = (syncAccountId, to, message, subject) => {
//       let variables = {
//         account: syncAccountId,
//         to: to,
//         bcc: [],
//         cc: [],
//         msg: message,
//         subject: subject
//       }
//       return context.freeagent.sendEmail(variables);
//     }
  
//     const getAgent = async (requestedBy) => {
//       if(!!!requestedBy){
//         return null;
//       }
//       let response = await context.freeagent.listEntityValues({
//         entity: "agent",
//         id: requestedBy
//       });
//       return response.entity_values[0].field_values.email_address.value;
//     }
  
//     try {
//       let template = await getEmailTemplate(templateId);
//       let body = template.body
          
//       const pairedAccounts = await context.freeagent.getTeamEmailPairedAccounts();
      
//       let syncAccounts = pairedAccounts.find((account) => account.agent.id == "6d1a8396-3627-46d3-a95c-2fcbc52d6e6a");
//       if(!syncAccounts.is_active){
//         return {emailStatus: "error: account deactivated"};
//       }
//       let send = await sendEmail(syncAccounts.id, [["timw@gwfg.com", "timw@gwfg.com"]], body, "Sample Requests - Daily Reminder")
//       return { emailStatus: send
//              };
//     } catch (e) {
//       await createNote(e);
//       throw new Error(e);
//     }
  
//   }(workflow, context));




  //_______________________________________________________



  //   mutation addTask($parent_entity_id: String, $parent_reference_id: String, $note: String, $type: String, $status: String, $closed_at: Date,$task_mentions:[String]) {
//     addTask(parent_entity_id: $parent_entity_id,note:$note, parent_reference_id: $parent_reference_id,type: $type, status: $status, closed_at: $closed_at,task_mentions:$task_mentions) {
//       id
//       note
//       closed_at
//     }
//   }