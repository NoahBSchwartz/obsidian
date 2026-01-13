import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Graph from "./Graph"

export default (() => {
  const GraphComponent = Graph({
    localGraph: {
      drag: true,
      zoom: true,
      depth: -1,
      scale: 1.1,
      repelForce: 1, // Increased repel force for massive graphs
      centerForce: 0.3,
      linkDistance: 40,
      fontSize: 0.5, // Smaller font for less clutter
      opacityScale: 1,
      showTags: true,
      removeTags: [],
      focusOnHover: true,
    },
    globalGraph: {
      drag: true,
      zoom: true,
      depth: -1,
      scale: 1.1,
      repelForce: 1,
      centerForce: 0.3,
      linkDistance: 40,
      fontSize: 0.5,
      opacityScale: 1,
      showTags: true,
      removeTags: [],
      focusOnHover: true,
    },
  })

  const LandingGraph: QuartzComponent = (props: QuartzComponentProps) => {
    // Only render on the "index" (home) page
    if (props.fileData.slug === "index") {
      return (
        <div class="landing-graph-container">
          <GraphComponent {...props} />
        </div>
      )
    } else {
      return <></>
    }
  }

  LandingGraph.afterDOMLoaded = GraphComponent.afterDOMLoaded

  // Custom CSS to make it full screen and hide other elements
  LandingGraph.css = GraphComponent.css + `
    .landing-graph-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: var(--light); /* Matches your theme background */
    }

    .landing-graph-container .graph {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* Hide the "Graph View" title */
    .landing-graph-container .graph h3 {
      display: none;
    }

    /* Force the inner graph containers to fill the screen */
    .landing-graph-container .graph-outer {
      height: 100% !important;
      width: 100% !important;
    }
    
    #graph-container {
      height: 100%;
      width: 100%;
    }
  `

  return LandingGraph
}) satisfies QuartzComponentConstructor