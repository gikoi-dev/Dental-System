import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Minus, Plus, RotateCcw, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONDITION_META,
  LOWER,
  UPPER,
  type ToothCondition,
  type ToothRecord,
} from "@/lib/mock-data";

const ARCHES = { upper: UPPER, lower: LOWER } as const;
const STATUS_COLORS: Record<ToothCondition, string> = {
  healthy: "#dcefe8",
  review: "#f4dba4",
  treated: "#c8e1f2",
  attention: "#efb5b5",
  missing: "#cbd5e1",
};

type ToothKind = "incisor" | "canine" | "premolar" | "molar";
type ViewPreset = "combined" | "front" | "upper" | "lower";

function toothKind(number: number): ToothKind {
  const position = number % 10;
  if (position <= 2) return "incisor";
  if (position === 3) return "canine";
  if (position <= 5) return "premolar";
  return "molar";
}

function toothDimensions(kind: ToothKind) {
  return {
    incisor: { width: 0.42, height: 0.82, depth: 0.3, bevel: 0.08 },
    canine: { width: 0.46, height: 0.78, depth: 0.34, bevel: 0.09 },
    premolar: { width: 0.58, height: 0.68, depth: 0.44, bevel: 0.1 },
    molar: { width: 0.76, height: 0.62, depth: 0.58, bevel: 0.12 },
  }[kind];
}

function createCrownGeometry(kind: ToothKind) {
  const d = toothDimensions(kind);
  const shape = new THREE.Shape();
  const pointed = kind === "canine";
  const halfW = d.width / 2;
  const halfH = d.height / 2;
  shape.moveTo(-halfW * 0.72, -halfH);
  shape.quadraticCurveTo(-halfW, -halfH * 0.48, -halfW * 0.82, halfH * 0.38);
  if (pointed) {
    shape.lineTo(0, halfH);
    shape.lineTo(halfW * 0.82, halfH * 0.38);
  } else {
    shape.quadraticCurveTo(-halfW * 0.4, halfH, 0, halfH * 0.92);
    shape.quadraticCurveTo(halfW * 0.4, halfH, halfW * 0.82, halfH * 0.38);
  }
  shape.quadraticCurveTo(halfW, -halfH * 0.48, halfW * 0.72, -halfH);
  shape.quadraticCurveTo(0, -halfH * 1.08, -halfW * 0.72, -halfH);
  return new THREE.ExtrudeGeometry(shape, {
    depth: d.depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: d.bevel,
    bevelThickness: d.bevel * 0.65,
    curveSegments: 8,
  });
}

function ToothMesh({
  number,
  tooth,
  selected,
  upper,
  index,
  onSelect,
}: {
  number: number;
  tooth: ToothRecord;
  selected: boolean;
  upper: boolean;
  index: number;
  onSelect: (number: number) => void;
}) {
  const kind = toothKind(number);
  const geometry = useMemo(() => createCrownGeometry(kind), [kind]);
  const dimensions = toothDimensions(kind);
  const angle = Math.PI * (0.12 + (0.76 * index) / 7);
  const radiusX = upper ? 3.05 : 2.82;
  const radiusZ = upper ? 1.48 : 1.28;
  const position: [number, number, number] = [
    -Math.cos(angle) * radiusX,
    upper ? 0.85 : -0.82,
    Math.sin(angle) * radiusZ,
  ];
  const tangent = (upper ? -1 : 1) * (angle - Math.PI / 2) * 0.42;
  const missing = tooth.condition === "missing";

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group
      position={position}
      rotation={[upper ? -0.16 : 0.16, tangent, upper ? 0.04 : -0.04]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(number);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
      userData={{ fdi: number }}
    >
      <mesh geometry={geometry} castShadow receiveShadow scale={missing ? 0.92 : 1}>
        <meshStandardMaterial
          color={STATUS_COLORS[tooth.condition]}
          roughness={0.34}
          metalness={0.02}
          transparent={missing}
          opacity={missing ? 0.32 : 1}
          emissive={selected ? "#0f766e" : "#000000"}
          emissiveIntensity={selected ? 0.24 : 0}
        />
      </mesh>
      {kind === "molar" && !missing ? (
        <group position={[0, dimensions.height * 0.48, dimensions.depth + 0.03]}>
          {[
            [-0.18, -0.12],
            [0.18, -0.12],
            [-0.18, 0.12],
            [0.18, 0.12],
          ].map(([x, y]) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0]} scale={[0.11, 0.09, 0.06]} castShadow>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#f8faf9" roughness={0.4} />
            </mesh>
          ))}
        </group>
      ) : null}
      <Html
        position={[-Math.cos(angle) * 0.42, upper ? 0.1 : -0.1, Math.sin(angle) * 0.42]}
        center
        distanceFactor={8}
        occlude={false}
      >
        <button
          type="button"
          aria-label={`Select tooth ${number}`}
          aria-pressed={selected}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(number);
          }}
          className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold shadow-sm transition ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border/80 bg-card/95 text-foreground hover:border-primary"}`}
        >
          {number}
        </button>
      </Html>
      {selected ? (
        <mesh position={[0, 0, -0.08]} scale={[1.12, 1.1, 0.7]}>
          <sphereGeometry args={[0.5, 20, 12]} />
          <meshBasicMaterial color="#14b8a6" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ) : null}
    </group>
  );
}

function GumArch({ upper }: { upper: boolean }) {
  const curve = useMemo(() => {
    const points = Array.from({ length: 20 }, (_, index) => {
      const angle = Math.PI * (0.12 + (0.76 * index) / 19);
      return new THREE.Vector3(
        -Math.cos(angle) * (upper ? 3.18 : 2.95),
        upper ? 0.45 : -0.45,
        Math.sin(angle) * (upper ? 1.62 : 1.4),
      );
    });
    return new THREE.CatmullRomCurve3(points);
  }, [upper]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 48, 0.24, 10, false]} />
      <meshStandardMaterial color="#d98f91" roughness={0.72} transparent opacity={0.68} />
    </mesh>
  );
}

function CameraRig({ preset, zoom }: { preset: ViewPreset; zoom: number }) {
  const { camera, size } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 4.5, 8.8));

  useEffect(() => {
    const positions: Record<ViewPreset, [number, number, number]> = {
      combined: [0, 4.5, 8.8],
      front: [0, 0.4, 10.5],
      upper: [0, 8.6, 0.8],
      lower: [0, -8.6, 0.8],
    };
    const [x, y, z] = positions[preset];
    const responsiveDistance = size.width < 600 ? 2 : 1;
    targetPosition.current.set(
      (x * responsiveDistance) / zoom,
      (y * responsiveDistance) / zoom,
      (z * responsiveDistance) / zoom,
    );
    controls.current?.target.set(0, 0, 0);
  }, [camera, preset, size.width, zoom]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPosition.current, 1 - Math.exp(-delta * 7));
    controls.current?.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan
      enableDamping
      dampingFactor={0.08}
      minDistance={5.5}
      maxDistance={15}
      maxPolarAngle={Math.PI * 0.92}
      minPolarAngle={Math.PI * 0.08}
    />
  );
}

function DentalScene({
  teeth,
  selected,
  onSelect,
  preset,
  zoom,
}: {
  teeth: Record<number, ToothRecord>;
  selected?: number;
  onSelect: (number: number) => void;
  preset: ViewPreset;
  zoom: number;
}) {
  return (
    <>
      <color attach="background" args={["#eef7f5"]} />
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[4, 7, 6]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#b5d9e7" />
      <GumArch upper />
      <GumArch upper={false} />
      {ARCHES.upper.map((number, index) => (
        <ToothMesh
          key={number}
          number={number}
          tooth={teeth[number]}
          selected={selected === number}
          upper
          index={index}
          onSelect={onSelect}
        />
      ))}
      {ARCHES.lower.map((number, index) => (
        <ToothMesh
          key={number}
          number={number}
          tooth={teeth[number]}
          selected={selected === number}
          upper={false}
          index={index}
          onSelect={onSelect}
        />
      ))}
      <ContactShadows position={[0, -1.6, 0]} opacity={0.28} scale={9} blur={2.4} far={7} />
      <CameraRig preset={preset} zoom={zoom} />
    </>
  );
}

export function Legend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {(Object.keys(CONDITION_META) as ToothCondition[]).map((condition) => (
        <span key={condition} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full border"
            style={{ backgroundColor: STATUS_COLORS[condition] }}
          />
          {CONDITION_META[condition].label}
        </span>
      ))}
    </div>
  );
}

export function Odontogram3D({
  teeth,
  selected,
  onSelect,
  simple,
}: {
  teeth: Record<number, ToothRecord>;
  selected?: number;
  onSelect: (n: number) => void;
  simple?: boolean;
}) {
  const [preset, setPreset] = useState<ViewPreset>(simple ? "front" : "combined");
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const presetLabels: Array<[ViewPreset, string]> = [
    ["combined", "Combined"],
    ["front", "Front"],
    ["upper", "Upper occlusal"],
    ["lower", "Lower occlusal"],
  ];

  return (
    <div className="relative space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Anatomical viewer
          </p>
          <p className="text-sm text-muted-foreground">
            Select a tooth to review its clinical record.
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-1 sm:flex"
          role="group"
          aria-label="Odontogram camera view"
        >
          {presetLabels.map(([value, label]) => (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={preset === value ? "default" : "outline"}
              aria-pressed={preset === value}
              onClick={() => setPreset(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className="relative h-[480px] overflow-hidden rounded-2xl border bg-[#eef7f5] shadow-soft sm:h-[560px]">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <View className="h-8 w-8 text-muted-foreground" />
            <p className="font-semibold">3D viewer unavailable</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Use the accessible tooth list below to review the same clinical records.
            </p>
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 4.5, 8.8], fov: 38, near: 0.1, far: 100 }}
            shadows
            dpr={[1, 1.75]}
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                WebGL is not available in this browser.
              </div>
            }
            onCreated={() => setError(false)}
            onError={() => setError(true)}
          >
            <DentalScene
              teeth={teeth}
              selected={selected}
              onSelect={onSelect}
              preset={preset}
              zoom={zoom}
            />
          </Canvas>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-1">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-card/90"
            aria-label="Zoom in"
            onClick={() => setZoom((value) => Math.min(1.35, value + 0.1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-card/90"
            aria-label="Zoom out"
            onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-card/90"
            aria-label="Reset view"
            onClick={() => {
              setPreset(simple ? "front" : "combined");
              setZoom(1);
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <p className="absolute bottom-3 left-3 rounded-md bg-card/85 px-2 py-1 text-[11px] text-muted-foreground">
          Drag to rotate · Scroll to zoom · Right-drag to pan
        </p>
      </div>
      <div className="sr-only" aria-label="Accessible tooth selection">
        {Object.values(teeth).map((tooth) => (
          <button
            key={tooth.number}
            type="button"
            aria-pressed={selected === tooth.number}
            onClick={() => onSelect(tooth.number)}
          >
            Tooth {tooth.number}, {CONDITION_META[tooth.condition].label}
          </button>
        ))}
      </div>
    </div>
  );
}
