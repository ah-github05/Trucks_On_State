import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MadisonFoodCartHomePage from "@/pages/home";
import IndividualFoodCartDetailPage from "@/pages/cart-detail";
import PageNotFoundError from "@/pages/not-found";

function ApplicationRouter() {
  return (
    <Switch>
      <Route path="/" component={MadisonFoodCartHomePage} />
      <Route path="/cart/:slug" component={IndividualFoodCartDetailPage} />
      <Route component={PageNotFoundError} />
    </Switch>
  );
}

function MadisonFoodCartFinderApplication() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ApplicationRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MadisonFoodCartFinderApplication;
