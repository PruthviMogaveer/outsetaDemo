import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import BusinessAcquisitionPlatform from "@/components/BusinessAcquisitionPlatform";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { AllLeads } from "@/pages/AllLeads";
import { AppScreen } from "@/lib/navigation";
import { Support } from "@/pages/Support";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import {
  OnboardingStep,
  OnboardingProgress,
  SubscriptionPlan,
} from "@/types/onboarding";
import { SubscriptionStep } from "@/components/onboarding/subscription/SubscriptionStep";
import { SurveyStep } from "@/components/onboarding/survey/SurveyStep";
import { SearchIntroStep } from "@/components/onboarding/search-intro/SearchIntroStep";
import { SearchCriteriaStep } from "@/components/onboarding/search-criteria/SearchCriteriaStep";
import { BuyerProfileStep } from "@/components/onboarding/buyer-profile/BuyerProfileStep";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoot from "@/AppRoot";

type AuthMode = "login" | "signup";

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [showDashboardTour, setShowDashboardTour] = useState(false);
  const [progress, setProgress] = useState<OnboardingProgress>({
    currentStep: "subscription",
    completedSteps: [],
  });

  const handleStepComplete = (step: OnboardingStep) => {
    const nextStep = getNextStep(step);
    setProgress((prev) => ({
      currentStep: nextStep,
      completedSteps: [...prev.completedSteps, step],
    }));

    if (step === "buyerProfile") {
      setIsOnboarding(false);
      setShowDashboardTour(true);
      // window.location.href = "/dashboard";
    }
  };

  const handleSkipBuyerProfile = () => {
    setIsOnboarding(false);
    setShowDashboardTour(true);
    // window.location.href = "/dashboard";
  };

  const getNextStep = (currentStep: OnboardingStep): OnboardingStep => {
    const steps: OnboardingStep[] = [
      "subscription",
      "survey",
      "searchIntro",
      "searchCriteria",
      "buyerProfile",
    ];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1] || steps[currentIndex];
  };

  const handleAuthSuccess = () => {
    if (authMode === "signup") {
      setIsOnboarding(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-color/10 min-h-screen min-w-full fixed -z-10"></div>
      {location.pathname === '/' && (
        <div className="mx-4 flex space-x-5">
          <a href="https://search-assistant.outseta.com/auth?widgetMode=login#o-anonymous">
            login
          </a>
          <a href="https://search-assistant.outseta.com/auth?widgetMode=register#o-anonymous">
            signup
          </a>
          <a href="/#o-logout-link">logot</a>
          <a href="https://search-assistant.outseta.com/profile#o-authenticated">
            profile
          </a>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppRoot>
                <Outlet />
              </AppRoot>
            }
          >
            <Route>
              <Route
                path="/onboarding"
                element={
                  <OnboardingLayout progress={progress}>
                    {progress.currentStep === "subscription" && (
                      <SubscriptionStep
                        onComplete={() => handleStepComplete("subscription")}
                        onPlanSelect={setSelectedPlan}
                      />
                    )}
                    {progress.currentStep === "survey" && (
                      <SurveyStep
                        onComplete={() => handleStepComplete("survey")}
                      />
                    )}
                    {progress.currentStep === "searchIntro" && (
                      <SearchIntroStep
                        onComplete={() => handleStepComplete("searchIntro")}
                        selectedPlan={selectedPlan}
                      />
                    )}
                    {progress.currentStep === "searchCriteria" && (
                      <SearchCriteriaStep
                        onComplete={() =>
                          handleStepComplete("searchCriteria")
                        }
                        selectedPlan={selectedPlan}
                      />
                    )}
                    {progress.currentStep === "buyerProfile" && (
                      <BuyerProfileStep
                        onComplete={() => handleStepComplete("buyerProfile")}
                        onSkip={handleSkipBuyerProfile}
                      />
                    )}
                  </OnboardingLayout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <BusinessAcquisitionPlatform showTour={showDashboardTour} />
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/all-leads" element={<AllLeads />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
