import axios from 'axios';

export class ConvertKitService {
  static endpoint = '/api/subscribe';

  static async FindSubscriberByEmail(email) {
    const payload = {
      params: {
        email: email
      }
    };

    try {
      const response = (await axios.get(this.endpoint, payload)).data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async AddSubscriber(formValues) {
    const payload = {
      ...formValues
    };

    try {
      const response = await axios.post(this.endpoint, payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async DeleteSubscriber(email) {
    const payload = {
      email: email
    };

    try {
      const response = await axios.put(this.endpoint, payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
}