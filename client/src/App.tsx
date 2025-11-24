import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MadisonFoodTruckHomePage from "@/pages/home";
import IndividualFoodTruckDetailPage from "@/pages/truck-detail";
import PageNotFoundError from "@/pages/not-found";
import { useEffect } from "react";

function ApplicationRouter() {
  const [location] = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
