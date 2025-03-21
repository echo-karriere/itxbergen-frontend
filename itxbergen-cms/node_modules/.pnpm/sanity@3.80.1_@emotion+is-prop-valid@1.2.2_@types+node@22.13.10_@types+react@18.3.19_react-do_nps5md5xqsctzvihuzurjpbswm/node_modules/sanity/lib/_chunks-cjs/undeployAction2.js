"use strict";
var _internal = require("./_internal.js"), helpers = require("./helpers.js");
const debug = _internal.debug.extend("undeploy");
async function undeployStudioAction(args, context) {
  const {
    apiClient,
    chalk,
    output,
    prompt,
    cliConfig
  } = context, flags = args.extOptions, client = apiClient({
    requireUser: !0,
    requireProject: !0
  }).withConfig({
    apiVersion: "v2024-08-01"
  });
  let spinner = output.spinner("Checking project info").start();
  const userApplication = await helpers.getUserApplication({
    client,
    appHost: cliConfig && "studioHost" in cliConfig ? cliConfig.studioHost : void 0
  });
  if (spinner.succeed(), !userApplication) {
    output.print("Your project has not been assigned a studio hostname"), output.print("or the `studioHost` provided does not exist."), output.print("Nothing to undeploy.");
    return;
  }
  output.print("");
  const url = `https://${chalk.yellow(userApplication.appHost)}.sanity.studio`;
  if (!(!(flags.yes || flags.y) && !await prompt.single({
    type: "confirm",
    default: !1,
    message: `This will undeploy ${url} and make it unavailable for your users.
  The hostname will be available for anyone to claim.
  Are you ${chalk.red("sure")} you want to undeploy?`.trim()
  }))) {
    spinner = output.spinner("Undeploying studio").start();
    try {
      await helpers.deleteUserApplication({
        client,
        applicationId: userApplication.id,
        appType: "studio"
      }), spinner.succeed();
    } catch (err) {
      throw spinner.fail(), debug("Error undeploying studio", err), err;
    }
    output.print(`Studio undeploy scheduled. It might take a few minutes before ${url} is unavailable.`);
  }
}
exports.default = undeployStudioAction;
//# sourceMappingURL=undeployAction2.js.map
