export const getEmailHTML = (htmlTemplate: string, code: string) => {
    const header = `
      <div style="margin: 0 auto; border: 1px solid rgba(0, 0, 0, .1); display: flex; align-items: center; justify-content: center;  padding: 1rem 2rem;">
        <h2>Joobs</h2>
      </div>
    `;
  
    const warning = `
      <div style="border-top: 1px solid rgba(0,0,0, 0.1);  padding: 1rem 2rem;">
        <p style="font-size: 14px; color:rgba(0,0,0, 0.6);">Joobs nunca enviará un correo electrónico solicitando que revele o verifique su contraseña, tarjeta de crédito o número de cuenta bancaria.</p>
      </div>
    `;
  
    const footer = `
      <p style="max-width: 500px; margin: 0 auto; text-align: center; font-family: sans-serif; font-size: 14px; color: rgba(0,0,0, 0.6);">Joobs, Inc,. &copy; 2023, Joobs. Todos los derechos reservados. Joobs es una marca comercial registrada de nevobit.com</p>
    `;
  


return `${header}\n${htmlTemplate}\n${warning}\n${footer}`.replace(
  '{code}', // o '{Detalles de la Oportunidad}' según la condición
  code
);

  };
  
  export const EmailSubjects = {
    verification: 'Verificación de correo electrónico Joobs',
    changePassword: 'Cambio de contraseña en Joobs',
    resetPassword: 'Reestablecer contraseña en Joobs',
    created: 'Oportunidad en Joobs',
  };
  
  export const EmailTemplates = {
    verification: `
      <div style=" padding: 1rem 2rem;">
        <h3 style="font-size: 1.2rem; color: rgba(0,0,0, 0.8);">Inicia sesión en Joobs</h3>
        <p style="font-size: 14px;">Ingresa el código de acceso en la aplicación para iniciar sesión de forma segura. Este codigo expirará en 15 minutos.</p>
        <h2>{code}</h2>
      </div>
    `,

    created: `
    <div style="padding: 1rem 2rem;">
    <h3 style="font-size: 1.2rem; color: rgba(0,0,0, 0.8);">¡Nueva Oportunidad de Trabajo en Joobs!</h3>
    <p style="font-size: 14px;">Se ha creado una emocionante nueva oportunidad de trabajo en Joobs. Revisa los detalles a continuación y no dudes en postularte:</p>
    <h2>{code}</h2>
    <p style="font-size: 14px;">¡Para aplicar y conocer más detalles, inicia sesión en la aplicación Joobs ahora!</p>
    <a href="https://play.google.com/store/apps/details?id=com.nevobit.joobs" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 15px; display: inline-block; border-radius: 5px;">Ir a Joobs</a>
</div>

  `,
  
    changePassword: `
      <div style=" padding: 1rem 2rem;">
        <h3 style="font-size: 1.2rem; color: rgba(0,0,0, 0.8);">Cambio de contraseña</h3>
        <p style="font-size: 14px;">Te informamos el cambio de contraseña de tu cuenta. Si fuiste tú, puedes ignorar este mensaje.</p>
      </div>
    `,
  
    resetPassword: `
      <div style=" padding: 1rem 2rem;">
        <h3 style="font-size: 1.2rem; color: rgba(0,0,0, 0.8);">Reestablecer contraseña en Partiaf</h3>
        <p style="font-size: 14px;">Recibimos una solicitud para reestablecer la contraseña de su cuenta Partiaf. Ingrese el siguiente código de verificación en la página correspondiente para continuar con el proceso.</p>
        <h4 style="text-align: center; margin: 0; margin-top: 2rem; margin-bottom: 5px; color: rgba(0,0,0, 0.8);">Código de verificación</h4>
        <h2 style="text-align: center; font-size: 2.2rem; margin: 0;">{code}</h2>
        <a>Ingresa el código</a>
        <p style="text-align: center; margin: 0; margin-bottom: 1rem; font-size: 14px; margin-top: 5px;">(Este código es válido durante 1 hora)</p>
      </div>
    `,
  };