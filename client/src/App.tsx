import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MadisonFoodCartHomePage from "@/pages/home";
import IndividualFoodCartDetailPage from "@/pages/cart-detail";
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
