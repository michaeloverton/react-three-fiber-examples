import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, LUT, BrightnessContrast, HueSaturation } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Suspense } from 'react'

function Model(props) {
  const { nodes } = useGLTF('/flower-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.petals.geometry}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={16}
          thickness={0.2}
          anisotropicBlur={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.5}
        />
        <mesh geometry={nodes.Sphere.geometry}>
          <MeshTransmissionMaterial samples={6} resolution={512} thickness={-1} anisotropy={0.25} />
        </mesh>
      </mesh>
      <mesh geometry={nodes.Sphere001.geometry}>
        <meshBasicMaterial toneMapped={false} color={[0.5, 4, 6]} />
      </mesh>
    </group>
  )
}

export default function GlassFlower() {
  const texture = useLoader(LUTCubeLoader, '/F-6800-STD.cube')
  return (
    <Canvas gl={{ antialias: false }} camera={{ position: [0, 2.5, 5], fov: 35 }}>
      <color attach="background" args={['#151520']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model position={[0, -0.25, 0]} />
      <OrbitControls autoRotate />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr" resolution={512}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="circle" intensity={10} position={[0, 10, -10]} scale={20} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer color="white" intensity={0.2} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 1, 0]} scale={[10, 100, 1]} />
        </group>
      </Environment>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} intensity={3.25} levels={9} mipmapBlur />
        <LUT lut={texture} />
        <BrightnessContrast brightness={0} contrast={0.1} />
        <HueSaturation hue={0} saturation={-0.25} />
      </EffectComposer>
    </Canvas>
  )
}
