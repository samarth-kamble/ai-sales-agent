import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HomeIcon } from "lucide-react";
import React from "react";
import { BsStars } from "react-icons/bs";
import { PiPipeLight } from "react-icons/pi";
import { leadData } from "./__test__/data";

const LeadsPage = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        mainIcon={<BsStars className="w-12 h-12" />}
        heading="Keep track of all your customers."
        placeholder="Search Name, Tag or Email"
        leftIcon={<PiPipeLight className="w-4 h-4" />}
        rightIcon={<HomeIcon className="w-3 h-3" />}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm text-muted-foreground">
              Name
            </TableHead>
            <TableHead className="text-sm text-muted-foreground">
              Email
            </TableHead>
            <TableHead className="text-sm text-muted-foreground">
              Phone
            </TableHead>
            <TableHead className="text-sm text-muted-foreground">
              Tags
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leadData?.map((lead, idx) => (
            <TableRow key={idx} className="border-0">
              <TableCell className="font-medium">{lead?.name}</TableCell>
              <TableCell>{lead?.email}</TableCell>
              <TableCell>{lead?.phone}</TableCell>
              <TableCell className="flex flex-wrap gap-2">
                {lead?.tags?.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsPage;
