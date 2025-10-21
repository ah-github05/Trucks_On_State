import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MadisonFoodTruckHomePage from "@/pages/home";
import IndividualFoodTruckDetailPage from "@/pages/truck-detail";
import PageNotFoundError from "@/pages/not-found";

function ApplicationRouter() {
  return (
    <Switch>
      <Route path="/" component={MadisonFoodTruckHomePage} />
      <Route path="/truck/:slug" component={IndividualFoodTruckDetailPage} />
      <Route component={PageNotFoundError} />
    </Switch>
  );
}

function MadisonFoodTruckFinderApplication() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ApplicationRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MadisonFoodTruckFinderApplication;
