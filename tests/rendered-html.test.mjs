import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const modules = ["automation","finance","inventory","marketing","reviews","payroll","passes","analytics","client-portal","access","integrations","security","onboarding","journey"];

test("all demo modules are connected to the main application", async()=>{
  const page=await readFile(new URL("app/page.tsx",root),"utf8");
  for(const name of modules){
    assert.match(page,new RegExp(`from ["']\\./${name}["']`),`${name} must be imported`);
  }
  assert.match(page,/navSections/);
  assert.match(page,/notification-panel/);
  assert.match(page,/view==="setup"/);
  assert.match(page,/view==="journey"/);
});

test("every product module has a stylesheet", async()=>{
  const files=await readdir(new URL("app/",root));
  for(const name of modules){
    assert.ok(files.includes(`${name}.css`),`${name}.css is missing`);
  }
  assert.ok(files.includes("shell-upgrades.css"));
});

test("production build contains client styles and server entrypoint",async()=>{
  const assets=await readdir(new URL("dist/client/assets/",root));
  assert.ok(assets.some(name=>name.endsWith(".css")),"client CSS bundle is missing");
  assert.ok(assets.some(name=>name.endsWith(".js")),"client JS bundle is missing");
  const server=await readFile(new URL("dist/server/index.js",root),"utf8");
  assert.ok(server.length>1000,"server bundle is unexpectedly small");
});
