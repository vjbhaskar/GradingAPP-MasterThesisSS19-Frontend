export class ConvertModelToFormData {
  public convert(model: any, form: FormData = null, namespace = ''): FormData {
      let formData = form || new FormData();

      for (let propertyName in model) {

          if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
          let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

          if (model[propertyName] instanceof Date) {
              formData.append(formKey, model[propertyName].toISOString());
          }
          else if (model[propertyName] instanceof Array) {
              model[propertyName].forEach((element, index) => {
                  const tempFormKey = `${formKey}[${index}]`;
                  this.convert(element, formData, tempFormKey);
              });
          }
          else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
              this.convert(model[propertyName], formData, formKey);
          }
          else {
              formData.append(formKey, model[propertyName]);
          }

      }
      return formData;
  }
}