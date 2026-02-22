import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"

import { CalDate } from "~/components/CalDate";
import { Search } from "~/components/Search";
import { Time } from "~/components/Time";
import { settings } from "~/settings/settings";

export default function Home() {

  return (
    <div class="grid place-items-center content-center h-screen w-screen">
      <div class="select-none text-center w-3/5">
        <Time></Time>
        <CalDate></CalDate>
        <br></br>
        <Search searchEngine={settings.get("search").get_search_engine()} searchTemplates={settings.get("search").search_templates}></Search>
      </div>
      <div>
        {/* <settings.render></settings.render> */}
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data
                from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
