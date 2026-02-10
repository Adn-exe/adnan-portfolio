import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define node interface
interface Node {
    id: number;
    x: number;
    y: number;
    z: number; // For 3D simulation depth
    radius: number;
    opacity: number;
}

// Define connection interface
interface Connection {
    from: number;
    to: number;
    opacity: number;
}

const ConnectivityGraph: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [rotation, setRotation] = useState(0);

    // Config
    const NODE_COUNT = 60;
    const CONNECTION_DISTANCE = 100;
    const RADIUS = 220;
    const CENTER = 250;

    useEffect(() => {
        // Generate nodes on a sphere surface projected to 2D
        const newNodes: Node[] = [];

        for (let i = 0; i < NODE_COUNT; i++) {
            // Random point on sphere surface
            const theta = Math.random() * 2 * Math.PI; // Longitude
            const phi = Math.acos(2 * Math.random() - 1); // Latitude

            // Convert to Cartesian
            const x = RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = RADIUS * Math.sin(phi) * Math.sin(theta);
            const z = RADIUS * Math.cos(phi);

            // Project 3D to 2D (simple orthographic for now, centered)
            // We'll update positions in animation loop for rotation
            newNodes.push({
                id: i,
                x: x,
                y: y,
                z: z,
                radius: Math.random() * 2 + 1.5, // 1.5 to 3.5
                opacity: Math.random() * 0.5 + 0.3 // 0.3 to 0.8
            });
        }
        setNodes(newNodes);
    }, []);

    // Animation Tick
    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            setRotation(prev => (prev + 0.002) % (2 * Math.PI));
            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Compute rotated positions and connections
    const { visibleNodes, visibleConnections } = useMemo(() => {
        if (nodes.length === 0) return { visibleNodes: [], visibleConnections: [] };

        // Rotate nodes around Y axis
        const rotatedNodes = nodes.map(node => {
            const x = node.x * Math.cos(rotation) - node.z * Math.sin(rotation);
            const z = node.x * Math.sin(rotation) + node.z * Math.cos(rotation);

            // Perspective / Scale based on Z (depth)
            // Simple depth check: only show front-facing nodes or dim back ones? 
            // Let's dim back ones heavily
            const scale = (z + RADIUS * 2) / (RADIUS * 3); // Simple depth scaling
            const alpha = z > 0 ? node.opacity : node.opacity * 0.2; // Dim back nodes

            return {
                ...node,
                renderX: CENTER + x,
                renderY: CENTER + node.y,
                renderZ: z,
                renderScale: scale,
                renderAlpha: alpha
            };
        });

        // Generate connections dynamically based on current positions
        const conns: Connection[] = [];
        // Only connect front-facing nodes for cleaner look? Or all?
        // Let's connect close nodes

        for (let i = 0; i < rotatedNodes.length; i++) {
            for (let j = i + 1; j < rotatedNodes.length; j++) {
                const n1 = rotatedNodes[i];
                const n2 = rotatedNodes[j];

                // Calculate distance
                const dx = n1.renderX - n2.renderX;
                const dy = n1.renderY - n2.renderY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    // Opacity based on distance and depth
                    // Provide stronger connections for closer nodes
                    const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.3 * Math.min(n1.renderAlpha, n2.renderAlpha);

                    if (opacity > 0.05) {
                        conns.push({ from: n1.id, to: n2.id, opacity });
                    }
                }
            }
        }

        return { visibleNodes: rotatedNodes, visibleConnections: conns };
    }, [nodes, rotation]);


    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-full">
            <svg
                viewBox="0 0 500 500"
                className="w-full h-full opacity-90"
                style={{ borderRadius: '50%' }}
            >
                <defs>
                    <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(0, 209, 255, 1)" />
                        <stop offset="100%" stopColor="rgba(0, 209, 255, 0)" />
                    </radialGradient>
                </defs>

                {/* Connections */}
                {visibleConnections.map((conn, i) => {
                    const n1 = visibleNodes.find(n => n.id === conn.from);
                    const n2 = visibleNodes.find(n => n.id === conn.to);
                    if (!n1 || !n2) return null;

                    return (
                        <line
                            key={`conn-${i}`}
                            x1={n1.renderX}
                            y1={n1.renderY}
                            x2={n2.renderX}
                            y2={n2.renderY}
                            stroke="rgba(0, 209, 255)"
                            strokeWidth="1"
                            strokeOpacity={conn.opacity}
                        />
                    );
                })}

                {/* Nodes */}
                {visibleNodes.map((node, i) => (
                    <circle
                        key={`node-${node.id}`}
                        cx={node.renderX}
                        cy={node.renderY}
                        r={node.radius * node.renderScale}
                        fill={node.renderZ > 0 ? "#fff" : "rgba(255,255,255,0.2)"}
                        fillOpacity={node.renderAlpha}
                    />
                ))}

                {/* Glow Overlay for "Atmosphere" */}
                <circle cx="250" cy="250" r="200" fill="url(#nodeGradient)" style={{ mixBlendMode: 'overlay' }} opacity="0.1" pointerEvents="none" />

            </svg>
        </div>
    );
};

export default ConnectivityGraph;
