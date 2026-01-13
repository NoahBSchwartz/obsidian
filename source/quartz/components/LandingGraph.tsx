import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Graph from "./Graph"

export default (() => {
  // Configure the graph to be "massive" (global, high depth)
  const GraphComponent = Graph({
    localGraph: {
      drag: true,
      zoom: true,
      depth: -1, // -1 means show all nodes (infinite depth)
      scale: 1.1,
      repelForce: 0.8, // Spread nodes out a bit more
      centerForce: 0.3,
      linkDistance: 40,
      fontSize: 0.6,
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
      repelForce: 0.8,
      centerForce: 0.3,
      linkDistance: 40,
      fontSize: 0.6,
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

  // Inherit the scripts and styles from the original Graph component
  LandingGraph.afterDOMLoaded = GraphComponent.afterDOMLoaded
  LandingGraph.css = GraphComponent.css + `
    .landing-graph-container .graph {
      height: 100%;
    }
    .landing-graph-container .graph-outer {
      height: 80vh; /* This makes it "massive" */
    }
  `

  return LandingGraph
}) satisfies QuartzComponentConstructor