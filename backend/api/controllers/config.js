import ConfigDAO from "../../dao/config";
import { validateConfig } from "../../handlers/validation";
import { MonkeyResponse } from "../../handlers/monkey-response";

class ConfigController {
  static async getConfig(req, _res) {
    const { uid } = req.ctx.decodedToken;

    const data = await ConfigDAO.getConfig(uid);
    return new MonkeyResponse("Configuration retrieved", data);
  }

  static async saveConfig(req, _res) {
    const { config } = req.body;
    const { uid } = req.ctx.decodedToken;

    validateConfig(config);
    await ConfigDAO.saveConfig(uid, config);

    return new MonkeyResponse("Config updated");
  }
}

export default ConfigController;
