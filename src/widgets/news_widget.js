import { WidgetTemplate } from "./widgets_template"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "~/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { createResource, Suspense } from "solid-js";
import { toast } from "solid-sonner";

export class NewsWidget extends WidgetTemplate {
    constructor(settings) {
        super("News", {
            url: "",
            ...settings,
        })
    }

    render_content() {

        const validate = (article) => {
            if (article["source"] == null && article["author"] == null) return false
            else if (article["title"] == null) return false
            else if (article["urlToImage"] == null) return false
            else return true
        }

        const shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }

        const fetchResource = async () => {
            const res = await fetch(this.settings.url);

            if (this.settings.url == "") {
                const json = {
                    "status_code": 200,
                    "message": "Successfully retrieved news headlines",
                    "data": {
                        "status": "ok",
                        "totalResults": 37,
                        "articles": [
                            {
                                "source": "Financial Times",
                                "author": "Peter Wells, Philip Georgiadis, Robert Orr, Zehra Munir, Kieran Cash, Orla Ryan, Alexandra White, Georgina Quach",
                                "title": "Middle East war: Trump says no deal with Iran except ‘unconditional surrender’ - Financial Times",
                                "url": "https://www.ft.com/content/95d840fe-9838-4b52-8f81-464fe7c52902",
                                "urlToImage": "https://images.ft.com/v3/image/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fec8b7a6e-51c0-4f85-8f9b-a29fb8014915.jpg?source=next-barrier-page"
                            },
                            {
                                "source": "USA Today",
                                "author": "Saleen Martin",
                                "title": "Woman arrested after Ohio girls found dead in suitcases, police say - USA Today",
                                "url": "https://www.usatoday.com/story/news/nation/2026/03/05/cleveland-girls-suitcases-graves-ohio-park/89003091007/",
                                "urlToImage": "https://www.usatoday.com/gcdn/authoring/authoring-images/2026/03/05/USAT/89003126007-getty-images-2243470331.jpg?crop=2120,1193,x0,y0&width=2120&height=1193&format=pjpg&auto=webp"
                            },
                            {
                                "source": "MLB.com",
                                "author": "Michael Clair",
                                "title": "Ohtani's slam in historic 10-run inning catapults Japan past Chinese Taipei - MLB.com",
                                "url": "https://www.mlb.com/news/japan-vs-chinese-taipei-in-2026-world-baseball-classic",
                                "urlToImage": "https://img.mlbstatic.com/mlb-images/image/upload/t_2x1/t_w1536/mlb/b0xjsny6kipsxkwwywjr.jpg"
                            },
                            {
                                "source": "CNN",
                                "author": "Laura Paddison",
                                "title": "Scientists are trying to solve the mystery of whether global warming is speeding up. A new study says it has the answer - CNN",
                                "url": "https://www.cnn.com/2026/03/06/climate/climate-warming-faster-scientists-2030-mystery",
                                "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/2025-01-08t025209z-1223380304-rc2c5carmx4i-rtrmadp-3-california-wildfires.jpg?c=16x9&q=w_800,c_fill"
                            },
                            {
                                "source": "CNBC",
                                "author": "Michael Wayland",
                                "title": "Used vehicle prices jump ahead of spring selling season optimism - CNBC",
                                "url": "https://www.cnbc.com/2026/03/06/used-vehicle-prices.html",
                                "urlToImage": "https://image.cnbcfm.com/api/v1/image/106889426-1626195968001-106889426-1622137995065-gettyimages-1233138884-AFP_9AW3FN.jpg?v=1772766676&w=1920&h=1080"
                            },
                            {
                                "source": "CNN",
                                "author": "Bryan Mena",
                                "title": "Retail sales fell more than expected in January, biggest drop in eight months - CNN",
                                "url": "https://www.cnn.com/2026/03/06/economy/us-retail-sales-january",
                                "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2263925951.jpg?c=16x9&q=w_800,c_fill"
                            },
                            {
                                "source": "CNBC",
                                "author": "Leslie Josephs",
                                "title": "United CEO Scott Kirby says higher airfare could be ahead after fuel price spike - CNBC",
                                "url": "https://www.cnbc.com/2026/03/06/united-airlines-ceo-scott-kirby.html",
                                "urlToImage": "https://image.cnbcfm.com/api/v1/image/108151969-1748533706089-gettyimages-2217674113-mms26698_w1jjwcfd.jpeg?v=1748533753&w=1920&h=1080"
                            },
                            {
                                "source": "MMA Fighting",
                                "author": "Alexander K. Lee",
                                "title": "Francis Ngannou is done with PFL - MMA Fighting",
                                "url": "https://www.mmafighting.com/pfl/475059/pfl-releases-francis-ngannou",
                                "urlToImage": "https://platform.mmafighting.com/wp-content/uploads/sites/109/2026/03/gettyimages-2178733959.jpg?quality=90&strip=all&crop=0%2C2.0329837621878%2C100%2C78.534031413613&w=1200"
                            },
                            {
                                "source": "PhillyVoice.com",
                                "author": null,
                                "title": "Eagles mailbag: WR supply and demand justifies Howie Roseman's rumored asking price for A.J. Brown - PhillyVoice",
                                "url": "https://www.phillyvoice.com/eagles-mailbag-wr-supply-demand-justifies-howie-roseman-rumored-asking-price-aj-brown/",
                                "urlToImage": "https://media.phillyvoice.com/media/images/USATSI_21392356.2e16d0ba.fill-1200x630-c0.jpg"
                            },
                            {
                                "source": "Associated Press",
                                "author": "Geoff Mulvihill",
                                "title": "This weekend’s US clock change is a problem, and there’s a deep divide on how to fix it - AP News",
                                "url": "https://apnews.com/article/daylight-saving-time-states-congress-standard-4cd5b467eed4ad1f112f0834aee3d45b",
                                "urlToImage": "https://dims.apnews.com/dims4/default/0225f61/2147483647/strip/true/crop/3000x1999+0+13/resize/980x653!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F5d%2F5c%2Fd48bd342929222d62ffbec5e13a3%2F4a16904e70d44ba9983951e1a41c62bb"
                            },
                            {
                                "source": "Associated Press",
                                "author": "Bharatha Mallawarachi, Sheikh Saaliq",
                                "title": "Sri Lanka takes custody of an Iranian vessel off its coast after US sank an Iranian warship - AP News",
                                "url": "https://apnews.com/article/iran-sri-lanka-iris-bushehr-9b3c31177bf8bf8accf22cf3add241d7",
                                "urlToImage": "https://dims.apnews.com/dims4/default/46205ca/2147483647/strip/true/crop/4901x3266+0+1/resize/980x653!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fb6%2F8e%2Fc047a15fc2d5d4df2ea3b0f9de1b%2Fb0ec1d936e034eb7b3a66128bf463ea9"
                            },
                            {
                                "source": "Al Jazeera English",
                                "author": "Al Jazeera Staff",
                                "title": "Cost to US for war on Iran is $3.7bn in first 100 hours, says think tank - Al Jazeera",
                                "url": "https://www.aljazeera.com/news/2026/3/6/cost-to-us-for-war-on-iran-is-3-7bn-in-first-100-hours-says-think-tank",
                                "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2025/06/AP25173647721368-1750616755.jpg?resize=1920%2C1440"
                            },
                            {
                                "source": "Politico",
                                "author": "Chris Sommerfeldt, Adam Wren",
                                "title": "Top Mamdani aide takes progressive project to the UK - Politico",
                                "url": "https://www.politico.com/news/2026/03/06/mamdani-aide-british-progressives-00814876",
                                "urlToImage": "https://www.politico.com/dims4/default/resize/1200/quality/90/format/jpg?url=https%3A%2F%2Fstatic.politico.com%2Fc1%2F51%2F256de8e44a01bbb29453927fa488%2Fh-16427415-edit.jpg"
                            },
                            {
                                "source": "Newsnationnow.com",
                                "author": "Brian Entin",
                                "title": "FBI searches home west of Nancy Guthrie’s house - NewsNation",
                                "url": "https://www.newsnationnow.com/missing/fbi-searches-home-west-nancy-guthrie/",
                                "urlToImage": "https://www.newsnationnow.com/wp-content/uploads/sites/108/2026/02/snapshot-2026-02-14T200954.876.jpg?w=1280"
                            },
                            {
                                "source": "NBC News",
                                "author": "Josh Cradduck, Patrick Smith",
                                "title": "Mother and daughter killed driving in storm as severe weather hits Oklahoma - NBC News",
                                "url": "https://www.nbcnews.com/weather/storms/mother-daughter-killed-driving-storm-severe-weather-oklahoma-fairview-rcna262062",
                                "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2026-03/260306-oklahoma-tornado-mb-1008-6c1d13.jpg"
                            },
                            {
                                "source": "NPR",
                                "author": "",
                                "title": "'Hoppers' review: Pixar's lively new movie is a dam good time - NPR",
                                "url": "https://www.npr.org/2026/03/06/nx-s1-5736549/hoppers-pixar-review",
                                "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2798x1573+362+1307/resize/1400/quality/85/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fd7%2F77%2F657523834f5a92bc4d4c738fe01f%2Fhoppers-online-use-h170-1-pub-pub16-1311.jpg"
                            },
                            {
                                "source": "STAT",
                                "author": "Alex Hogan",
                                "title": "How the ‘holy grail’ weight loss pill became a reality, and what comes next - statnews.com",
                                "url": "https://www.statnews.com/2026/03/06/glp-1-weight-loss-pill-development-status-report-alex-hogan/",
                                "urlToImage": "https://www.statnews.com/wp-content/uploads/2026/03/SR_31_HP_STILL-1024x576.jpg"
                            },
                            {
                                "source": "The Washington Post",
                                "author": "Karen DeYoung, Mustafa Salim, Ellen Nakashima, Warren P. Strobel",
                                "title": "Trump calls on Kurds to aid U.S. effort in Iran, offers support - The Washington Post",
                                "url": "https://www.washingtonpost.com/national-security/2026/03/05/trump-iran-kurds-iraq/",
                                "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/245ZB7UJWL6IMKSYBLDSI65KGA_size-normalized.jpg&w=1440"
                            },
                            {
                                "source": "Rocky Top Insider",
                                "author": "Ryan Sylvia",
                                "title": "Everything Lady Vols Basketball HC Kim Caldwell Said After Loss to Alabama in SEC Tournament - Rocky Top Insider",
                                "url": "https://www.rockytopinsider.com/2026/03/05/everything-lady-vols-basketball-hc-kim-caldwell-said-after-loss-to-alabama-in-sec-tournament/",
                                "urlToImage": "https://www.rockytopinsider.com/wp-content/uploads/2024/11/Kim-Caldwell-—-Tennessee-Basketball.png"
                            },
                            {
                                "source": "Fox Business",
                                "author": "Landon Mion",
                                "title": "Target set to open its 2,000th store, plans to open hundreds more in next decade - Fox Business",
                                "url": "https://www.foxbusiness.com/economy/target-set-open-its-2000th-store-plans-open-hundreds-more-next-decade",
                                "urlToImage": "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2021/10/0/0/Target-shopping-cart.jpg?ve=1&tl=1"
                            },
                            {
                                "source": "Eonline.com",
                                "author": null,
                                "title": "Bridgerton's Nicola Coughlan Slams Body Comments After Her Weight Loss - E! News",
                                "url": "https://www.eonline.com/news/1429378/bridgertons-nicola-coughlan-on-weight-loss-plus-size-body-positivity",
                                "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/20260305/e0c281f0-16b2-498c-a375-9afe0576a637_1772760344.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top"
                            },
                            {
                                "source": "NBC News",
                                "author": "Joe Kottke, Phil Helsel",
                                "title": "Reality TV star Tracy Tutor accuses Alexander brother of sexual assault in lawsuit - NBC News",
                                "url": "https://www.nbcnews.com/news/us-news/tracy-tutor-oren-alexander-sexual-assault-lawsuit-rcna262038",
                                "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2026-03/260305-tracy-tutor-vsb-2029-386ceb.jpg"
                            },
                            {
                                "source": "Fox News",
                                "author": null,
                                "title": "Hegseth blasts Brits, says Iran's chaotic retaliation has driven its own allies 'into the American orbit' - Fox News",
                                "url": "https://www.foxnews.com/politics/hegseth-blasts-brits-says-irans-chaotic-retaliation-driven-its-own-allies-american-orbit",
                                "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/06/hegseth1.png"
                            },
                            {
                                "source": "Live Science",
                                "author": "Brandon Specktor",
                                "title": "James Webb telescope pushed to its limits by new observations of 'city killer' asteroid 2024 YR4 - Live Science",
                                "url": "https://www.livescience.com/space/asteroids/nasa-updates-odds-that-city-killer-asteroid-2024-yr4-will-hit-the-moon",
                                "urlToImage": "https://cdn.mos.cms.futurecdn.net/FasZ27BnUtAKBFpoFfHLhV-1600-80.jpg"
                            },
                            {
                                "source": "Kotaku",
                                "author": "Lewis Parker",
                                "title": "Arc Raiders Gets Emergency Hotfix For Discord Privacy Issue - Kotaku",
                                "url": "https://kotaku.com/arc-raiders-hotfix-discord-integration-2000676444",
                                "urlToImage": "https://kotaku.com/app/uploads/2025/12/arcraiders000.jpg"
                            },
                            {
                                "source": "Abcnews.com",
                                "author": "ABC News",
                                "title": "Chickpeas have successfully grown and been harvested in simulated moon dirt, a new study says - ABC News",
                                "url": "https://abcnews.com/Technology/chickpeas-successfully-grown-harvested-simulated-moon-dirt-new/story?id\\\\u003d130799294",
                                "urlToImage": null
                            },
                            {
                                "source": "The Denver Post",
                                "author": "Meg Wingerter",
                                "title": "Measles exposure locations in Colorado: 2 schools, 3 restaurants and a grocery store - The Denver Post",
                                "url": "https://www.denverpost.com/2026/03/05/colorado-measles-outbreak-exposures/",
                                "urlToImage": "https://www.denverpost.com/wp-content/uploads/2025/12/202512090415MCT_____PHOTO____US-NEWS-HEALTH-MEASLES-SCIENTISTS-MCT-1.jpg?w=1024&h=768"
                            },
                            {
                                "source": "MacRumors",
                                "author": "Joe Rossignol",
                                "title": "Missing From Apple's Announcements: iPad 12 With Apple Intelligence - MacRumors",
                                "url": "https://www.macrumors.com/2026/03/05/ipad-12-with-apple-intelligence/",
                                "urlToImage": "https://images.macrumors.com/t/8YSmQuzYwbX05dR6RnXsZ9oOHps=/1600x/article-new/2025/03/iPad-A16-Colors.jpg"
                            },
                            {
                                "source": "JoBlo.com",
                                "author": "Alex Maidy",
                                "title": "Rooster TV Review: Steve Carell and Bill Lawrence deliver another winning HBO comedy - JoBlo",
                                "url": "https://www.joblo.com/rooster-tv-review/",
                                "urlToImage": "https://www.joblo.com/wp-content/uploads/2026/03/rooster-review-socials.jpg"
                            },
                            {
                                "source": "BBC News",
                                "author": null,
                                "title": "Starmer stands by decision not to join US-Israeli strikes on Iran - BBC",
                                "url": "https://www.bbc.com/news/articles/cdr2214nmk8o",
                                "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/8099/live/27003160-18b4-11f1-97ba-493bedc7637b.jpg"
                            },
                            {
                                "source": "NBC News",
                                "author": "Nicole Acevedo",
                                "title": "New Mexico confirms latest measles case at a local jail - NBC News",
                                "url": "https://www.nbcnews.com/news/us-news/new-mexico-confirms-latest-measles-case-local-jail-rcna261893",
                                "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2026-03/260305-dona-ana-county-detention-center-mn-0840-710412.jpg"
                            },
                            {
                                "source": "PCWorld",
                                "author": "Ben Patterson",
                                "title": "Google makes Gmail, Drive, and Docs ‘agent-ready’ for OpenClaw - PCWorld",
                                "url": "https://www.pcworld.com/article/3079523/google-makes-gmail-drive-and-docs-agent-ready-for-openclaw.html",
                                "urlToImage": "https://www.pcworld.com/wp-content/uploads/2026/03/Google-Drive-on-phone-in-hand-and-on-laptop-on-desk.jpg?quality=50&strip=all&w=1024"
                            },
                            {
                                "source": "Theregister.com",
                                "author": "Richard Speed",
                                "title": "Copilot swallows your browser. You're welcome - theregister.com",
                                "url": "https://www.theregister.com/2026/03/05/microsoft_adds_a_sidepane_for/",
                                "urlToImage": "https://regmedia.co.uk/2024/03/21/copilot_shutterstock.jpg"
                            },
                            {
                                "source": "Forbes",
                                "author": "Jamie Carter",
                                "title": "Photographer Captures Rare Blue Line On Tuesday’s ‘Blood Moon’ Eclipse - Forbes",
                                "url": "https://www.forbes.com/sites/jamiecartereurope/2026/03/05/photographer-captures-rare-blue-line-on-tuesdays-blood-moon-eclipse/",
                                "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/69a94165c1e231faee9b08a1/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
                            },
                            {
                                "source": "Fox News",
                                "author": null,
                                "title": "Origin of deadly cancer affecting young adults revealed in alarming report - Fox News",
                                "url": "https://www.foxnews.com/health/origin-deadly-cancer-affecting-young-adults-revealed-alarming-report",
                                "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2026/03/woman-at-hospital-worried.jpg"
                            }
                        ]
                    }
                }

                return shuffle(json["data"]["articles"].filter(e => validate(e)));
            }

            if (this.settings.url == "" || !res.ok) {
                toast.error("System Info: Failed to fetch from url")
                throw new Error('Failed to fetch from url');
            }

            const text = await res.text();

            try {
                const json = JSON.parse(text);

                return shuffle(json["data"]["articles"].filter(e => validate(e)));
            } catch (err) {
                toast.error("System Info: Invalid JSON response");
                throw new Error("Invalid JSON response");
            }

        }

        const [data, { refetch, mutate }] = createResource(fetchResource)

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse"></div>}>

                <Carousel class="w-full h-full [&>div]:h-full"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnMouseEnter: true
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}>
                    <CarouselContent class="h-full">
                        <For each={data()}>
                            {(e, index) => {
                                let source = []
                                if (e.source != null) source.push(e.source)
                                if (e.author != null) source.push(e.author.split(",")[0])

                                return (
                                    <CarouselItem key={e.title} class="h-full">
                                        <div class="h-full bg-cover bg-no-repeat bg-center mx-auto bg-transparent rounded-sm cursor-pointer" style={{ "background-image": `url(${e.urlToImage})` }}>
                                            <a href={e.url}>
                                                <div class="bg-linear-to-b from-transparent to-(--color-bg) h-full rounded-sm">
                                                    <div class="h-full relative">
                                                        <div class="absolute bottom-2 px-4">
                                                            <p class={`text-xs line-clamp-${this.settings.height + 1}`}>{e.title.split(" - ")[0]}</p>
                                                            <p class="text-[10px] muted mt-1 line-clamp-1">{source.join(" • ")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </CarouselItem>
                                )
                            }}
                        </For>
                    </CarouselContent>
                    <CarouselPrevious class="cursor-pointer ml-14 top-[45%] bg-transparent border-none" />
                    <CarouselNext class="cursor-pointer mr-14 top-[45%] bg-transparent border-none" />
                </Carousel>
            </Suspense>
        )
    }
}