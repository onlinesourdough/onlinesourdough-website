import { NewsletterContent } from "./Family";
import { usePageMetadata } from "../hooks/use-page-metadata";
export function NewsletterPage() {
 const thanks = window.location.pathname.replace(/\/$/, "").endsWith("/thank-you");
 usePageMetadata({ title:`${thanks ? "Newsletter signup" : "Notes from the work"} | onlinesourdough`, description:"Ideas, experiments and lessons from working with data, AI and business context.", url:`https://onlinesourdough.com/newsletter/${thanks ? "thank-you/" : ""}`, themeColor:"#f8f2e8", ogTitle:thanks ? "Newsletter signup" : "Notes from the work", ogDescription:"Ideas, experiments and lessons from working with data, AI and business context." });
 return <main className="family-newsletter-main"><NewsletterContent brand="onlinesourdough" /></main>;
}
