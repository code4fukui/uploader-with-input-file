import { makeFetch } from "https://code4fukui.github.io/PubkeyUser/serverutil.js";
import { TID } from "https://code4fukui.github.io/TID/TID.js";
import { EXT } from "https://code4fukui.github.io/EXT/EXT.js";
import { FileStorage } from "https://code4fukui.github.io/FileStorage/FileStorage.js";
import allowedUsers from "./allowedUsers.json" with { type: "json" };

const fs = new FileStorage("data");

const api = async (path, param, pubkey) => {
  if (path == "upload") {
    if (!pubkey) return { error: "no pubkey" };
    if (allowedUsers.indexOf(pubkey) == -1) return { error: "not allowed" };
    
    const tid = TID.create();
    const ext = EXT.get(param.fn);
    await fs.save(TID.getPath(tid, ext), param.bin);
    return tid;
  }
};

export default { fetch: makeFetch(api) };
