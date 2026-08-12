import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function ContactForm({ artisanId }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/artisans/${artisanId}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setConfirmation(data.message || 'Une erreur est survenue.');
        return;
      }

      setConfirmation('Message envoyé avec succès !');

      setFormData({
        nom: '',
        email: '',
        objet: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setConfirmation('Impossible d’envoyer le message.');
    }
  };

  return (
    <section className="contact-form">
      <h2>Contacter cet artisan</h2>
  
      <form onSubmit={handleSubmit} className="contact-form__form">
        <div className="contact-form__group">
        <label htmlFor="nom" className="visually-hidden">
  Nom
</label>

<input
  type="text"
  id="nom"
  name="nom"
  placeholder="Nom"
  value={formData.nom}
  onChange={handleChange}
  required
/>
        </div>
  
        <div className="contact-form__group">
  <label htmlFor="email" className="visually-hidden">
    E-mail
  </label>

  <input
    type="email"
    id="email"
    name="email"
    placeholder="E-mail"
    value={formData.email}
    onChange={handleChange}
    required
  />
</div>
  
<div className="contact-form__group">
  <label htmlFor="objet" className="visually-hidden">
    Objet
  </label>

  <input
    type="text"
    id="objet"
    name="objet"
    placeholder="Objet du message"
    value={formData.objet}
    onChange={handleChange}
    required
  />
</div>
  
<div className="contact-form__group">
  <label htmlFor="message" className="visually-hidden">
    Message
  </label>

  <textarea
    id="message"
    name="message"
    placeholder="Votre message"
    value={formData.message}
    onChange={handleChange}
    required
  />
</div>
  
        <button type="submit" className="contact-form__button">
          Envoyer
        </button>
      </form>
  
      {confirmation && (
        <p className="contact-form__confirmation">
          {confirmation}
        </p>
      )}
    </section>
  );
}

export default ContactForm;